'use client';

import { useEffect, useRef, useState } from 'react';
import { TbAntenna, TbFingerprint, TbLock, TbX } from 'react-icons/tb';
import './privacy-consent.css';

type Consent = 'granted' | 'denied';

const consentKey = 'vb-profile.analytics-consent';
const beaconId = 'vb-cloudflare-analytics';

function readConsent(): Consent | null {
  try {
    const saved = window.localStorage.getItem(consentKey);
    return saved === 'granted' || saved === 'denied' ? saved : null;
  } catch {
    return null;
  }
}

function reloadWithoutAnalytics() {
  // The beacon can flush pending measurements as the old document unloads.
  const policy = document.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "connect-src 'self'";
  document.head.append(policy);
  window.location.reload();
}

export default function PrivacyConsent() {
  const [consent, setConsent] = useState<Consent | null>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsButton = useRef<HTMLButtonElement>(null);
  const panelTitle = useRef<HTMLHeadingElement>(null);
  const panelOpen = settingsOpen || consent === null;

  useEffect(() => {
    function restoreConsent() {
      const saved = readConsent();
      if (saved !== 'granted' && document.getElementById(beaconId)) {
        reloadWithoutAnalytics();
        return;
      }
      setConsent(saved);
    }

    function onStorage(event: StorageEvent) {
      if (event.key === consentKey || event.key === null) restoreConsent();
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) restoreConsent();
    }

    restoreConsent();
    window.addEventListener('storage', onStorage);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  useEffect(() => {
    if (consent !== 'granted' || document.getElementById(beaconId)) return;

    const script = document.createElement('script');
    script.id = beaconId;
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset.cfBeacon = JSON.stringify({ token: '6fcca25102d449e3a8194e7974397933' });
    document.head.append(script);
  }, [consent]);

  useEffect(() => {
    if (settingsOpen) panelTitle.current?.focus();
  }, [settingsOpen]);

  function closeSettings() {
    setSettingsOpen(false);
    settingsButton.current?.focus();
  }

  function saveConsent(choice: Consent) {
    try {
      window.localStorage.setItem(consentKey, choice);
    } catch {
      // The choice still applies to this page when browser storage is unavailable.
    }

    if (choice === 'denied' && document.getElementById(beaconId)) {
      reloadWithoutAnalytics();
      return;
    }

    setConsent(choice);
    closeSettings();
  }

  if (consent === undefined) return null;

  return (
    <div className="privacy-widget">
      {panelOpen && (
        <section
          id="privacy-consent"
          className="privacy-panel"
          aria-labelledby="privacy-consent-title"
          onKeyDown={(event) => {
            if (settingsOpen && event.key === 'Escape') closeSettings();
          }}
        >
          <div className="privacy-panel__header">
            <span className="privacy-panel__protocol">
              <TbAntenna aria-hidden="true" /> VB // DATA PROTOCOL
            </span>
            <span className="privacy-panel__status" aria-hidden="true">
              <span className="privacy-panel__dot" />
              ACTIVE <span className="privacy-panel__counter">01/01</span>
            </span>
            {settingsOpen && (
              <button
                type="button"
                className="privacy-panel__close"
                aria-label="Close privacy settings"
                onClick={closeSettings}
              >
                <TbX aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="privacy-panel__body">
            <div className="privacy-panel__intro">
              <span className="privacy-panel__fingerprint" aria-hidden="true">
                <TbFingerprint />
              </span>
              <div>
                <h2 id="privacy-consent-title" ref={panelTitle} tabIndex={-1}>
                  ANALYTICS PERMISSION
                </h2>
                <p>
                  Help us understand website traffic with privacy-friendly analytics. Your choice
                  remains yours.
                </p>
              </div>
            </div>

            <p className="privacy-panel__metadata">
              <TbLock aria-hidden="true" /> NO COOKIES · NO ADS · OPTIONAL
            </p>

            {settingsOpen && (
              <div id="privacy-settings" className="privacy-panel__settings">
                <p>Analytics is {consent === 'granted' ? 'enabled' : 'disabled'}.</p>
                <details>
                  <summary>Privacy Policy</summary>
                  <p>
                    With your permission, VB Profile uses Cloudflare Web Analytics to understand
                    site traffic and page performance. The beacon sends data such as visited page
                    paths, referrers, and page load and interaction timings to Cloudflare.
                    Cloudflare receives your IP address when handling the request and says it
                    discards it at its nearest data center.
                  </p>
                  <p>
                    The beacon uses no cookies. VB Profile saves your choice in this browser’s local
                    storage. You can change it in Privacy Settings at any time. Choose Deny to
                    withdraw consent and reload the page with analytics disabled.
                  </p>
                  <a href="https://developers.cloudflare.com/speed/observatory/rum-beacon/">
                    Cloudflare’s data collection documentation
                  </a>
                </details>
              </div>
            )}

            <div className="privacy-panel__actions">
              <button type="button" onClick={() => saveConsent('denied')}>
                DENY
              </button>
              <button type="button" onClick={() => saveConsent('granted')}>
                AUTHORIZE
              </button>
            </div>
          </div>
        </section>
      )}

      <button
        ref={settingsButton}
        type="button"
        className="privacy-widget__trigger"
        aria-expanded={settingsOpen}
        aria-controls={settingsOpen ? 'privacy-settings' : undefined}
        onClick={() => (settingsOpen ? closeSettings() : setSettingsOpen(true))}
      >
        Privacy Settings
      </button>
    </div>
  );
}
