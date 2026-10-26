import { spawn } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const label = process.argv[2] || 'audit';
if (!/^[a-z0-9-]+$/i.test(label))
  throw new Error('Use a simple audit label, e.g. before or after.');
const base = process.env.LIGHTHOUSE_BASE_URL || 'http://127.0.0.1:3002';
const routes = ['/', '/experience', '/projects', '/skills', '/contact'];
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const metrics = [
  'largest-contentful-paint',
  'first-contentful-paint',
  'cumulative-layout-shift',
  'total-blocking-time',
  'speed-index',
];
const output = path.join(root, 'reports', 'lighthouse', label);
if (existsSync(output)) throw new Error(`Preserving existing reports: ${output}. Use a new label.`);
const chrome = process.env.CHROME_PATH || findChrome();
function findChrome() {
  const candidates = [
    path.join(process.env.PROGRAMFILES || '', 'Google/Chrome/Application/chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe'),
  ];
  const browsers = path.join(process.env.LOCALAPPDATA || '', 'ms-playwright');
  if (existsSync(browsers))
    for (const name of readdirSync(browsers)
      .filter((n) => /^chromium-\d+$/.test(n))
      .sort()
      .reverse())
      candidates.push(path.join(browsers, name, 'chrome-win64/chrome.exe'));
  const found = candidates.find(existsSync);
  if (!found) throw new Error('Set CHROME_PATH to a Chrome/Chromium executable.');
  return found;
}
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  if (!response.ok)
    throw new Error(`${route}: HTTP ${response.status}. Start the production server first.`);
}
mkdirSync(output, { recursive: true });
const summary = [],
  failed = [];
for (const device of ['mobile', 'desktop']) {
  const work = mkdtempSync(path.join(tmpdir(), `vb-lhci-${label}-${device}-`));
  const config = {
    ci: {
      collect: {
        url: routes.map((route) => new URL(route, base).href),
        numberOfRuns: 3,
        chromePath: chrome,
        settings: device === 'desktop' ? { preset: 'desktop' } : {},
      },
    },
  };
  const configPath = path.join(work, 'lighthouserc.json');
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`\n${label}: ${device}, five routes × three cold navigations (Lighthouse defaults)`);
  await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [require.resolve('@lhci/cli/src/cli.js'), 'collect', `--config=${configPath}`],
      { cwd: work, env: process.env, stdio: 'inherit' },
    );
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`LHCI exited ${code}; partial reports preserved in ${work}`)),
    );
  });
  const saved = path.join(work, '.lighthouseci');
  const reports = readdirSync(saved)
    .filter((n) => /^lhr-\d+\.json$/.test(n))
    .sort()
    .map((name) => ({ name, lhr: JSON.parse(readFileSync(path.join(saved, name), 'utf8')) }));
  for (const route of routes) {
    const runs = reports.filter(({ lhr }) => new URL(lhr.requestedUrl).pathname === route);
    if (runs.length !== 3 || runs.some(({ lhr }) => lhr.runtimeError))
      throw new Error(`Invalid audit count/runtime error: ${device} ${route}`);
    const routeDir = path.join(output, device, route === '/' ? 'home' : route.slice(1));
    mkdirSync(routeDir, { recursive: true });
    runs.forEach(({ name, lhr }, i) => {
      copyFileSync(path.join(saved, name), path.join(routeDir, `run-${i + 1}.json`));
      copyFileSync(
        path.join(saved, name.replace('.json', '.html')),
        path.join(routeDir, `run-${i + 1}.html`),
      );
      const weights = Object.fromEntries(
        Object.values(lhr.categories).flatMap((c) => c.auditRefs.map((a) => [a.id, a.weight])),
      );
      for (const [id, audit] of Object.entries(lhr.audits))
        if (
          (typeof audit.score === 'number' && audit.score < 1) ||
          audit.scoreDisplayMode === 'error'
        )
          failed.push({
            route,
            device,
            run: i + 1,
            id,
            score: audit.score,
            categoryWeight: weights[id] ?? 0,
            title: audit.title,
            recommendation: audit.description,
            displayValue: audit.displayValue,
            details: audit.details,
          });
    });
    const item = {
      route,
      device,
      scores: Object.fromEntries(
        categories.map((key) => [
          key,
          median(runs.map(({ lhr }) => lhr.categories[key].score * 100)),
        ]),
      ),
      metrics: Object.fromEntries(
        metrics.map((key) => [key, median(runs.map(({ lhr }) => lhr.audits[key].numericValue))]),
      ),
      runs: runs.map(({ lhr }) => ({
        scores: Object.fromEntries(categories.map((key) => [key, lhr.categories[key].score * 100])),
        metrics: Object.fromEntries(metrics.map((key) => [key, lhr.audits[key].numericValue])),
      })),
      settings: runs[0].lhr.configSettings,
      lighthouseVersion: runs[0].lhr.lighthouseVersion,
      userAgent: runs[0].lhr.userAgent,
    };
    summary.push(item);
    console.log(
      `${device} ${route}: ${JSON.stringify(item.scores)} LCP=${Math.round(item.metrics['largest-contentful-paint'])}ms`,
    );
  }
  writeFileSync(path.join(output, 'summary.json'), JSON.stringify(summary, null, 2));
  writeFileSync(path.join(output, 'failed-audits.json'), JSON.stringify(failed, null, 2));
}
console.log(`\nSaved 30 JSON + 30 HTML reports and medians to ${output}`);
