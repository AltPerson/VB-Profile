'use client';

import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { contactData } from '@/constants/portfolio-data';
import { useEffect, useRef, useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi';
import { SiGithub, SiTelegram } from 'react-icons/si';
import MailHologram from './MailHologram';
import './contact-uplink.css';

const channelPresentation = {
  linkedin: { name: 'LinkedIn', detail: 'Professional opportunities', Icon: FaLinkedinIn },
  github: { name: 'GitHub', detail: 'Repos & code', Icon: SiGithub },
  telegram: { name: 'Telegram', detail: 'Direct messaging', Icon: SiTelegram },
};
type Channel = keyof typeof channelPresentation;
const paths: Record<Channel, string> = {
  linkedin: 'M450 0V19H150V70',
  github: 'M450 0V70',
  telegram: 'M450 0V19H750V70',
};

export default function Content() {
  const email = contactData.contacts.find((contact) => contact.title.toLowerCase() === 'email')!;
  const channels = contactData.contacts.filter(
    (contact) => contact.title.toLowerCase() !== 'email',
  );
  const [copyState, setCopyState] = useState<'idle' | 'pending' | 'copied' | 'error'>('idle');
  const [hovered, setHovered] = useState<Channel | null>(null);
  const [focused, setFocused] = useState<Channel | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const copying = useRef(false);
  const mounted = useRef(true);
  const active = hovered ?? focused;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(resetTimer.current);
    };
  }, []);

  async function copyEmail() {
    if (copying.current) return;
    copying.current = true;
    clearTimeout(resetTimer.current);
    setCopyState('pending');
    let copied = false;
    try {
      await navigator.clipboard.writeText(email.link);
      copied = true;
    } catch {
      // The displayed address stays selectable even when both clipboard methods are blocked.
      const previousFocus = document.activeElement as HTMLElement | null;
      const selection = window.getSelection();
      const ranges = selection
        ? Array.from({ length: selection.rangeCount }, (_, i) =>
            selection.getRangeAt(i).cloneRange(),
          )
        : [];
      const input = document.createElement('textarea');
      input.value = email.link;
      input.readOnly = true;
      input.className = 'contact-uplink__clipboard';
      input.setAttribute('aria-label', 'Email address to copy');
      document.body.appendChild(input);
      try {
        input.select();
        input.setSelectionRange(0, input.value.length);
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      } finally {
        input.remove();
        previousFocus?.focus({ preventScroll: true });
        selection?.removeAllRanges();
        ranges.forEach((range) => selection?.addRange(range));
      }
    } finally {
      copying.current = false;
    }
    if (!mounted.current) return;
    setCopyState(copied ? 'copied' : 'error');
    if (copied) resetTimer.current = setTimeout(() => setCopyState('idle'), 2400);
  }

  return (
    <div className="contact-uplink">
      <DefaultLayout>
        <header className="contact-uplink__heading">
          <h1 className="greetings-title contact-uplink__title">
            <TypewriterText text={contactData.title} />
          </h1>
        </header>
        <div className="contact-uplink__body after-typing">
          <section className="contact-uplink__primary" aria-labelledby="uplink-heading">
            <div className="contact-uplink__message">
              <h2 id="uplink-heading">
                Let&apos;s make <span>something</span> worth building.
              </h2>
              <p>
                Have a project, an opportunity, or a question? The shortest path is a direct
                message.
              </p>
              <div className="contact-uplink__email">{email.link}</div>
              <div className="contact-uplink__actions">
                <a
                  className="contact-uplink__send"
                  href={`mailto:${email.link}`}
                  aria-label={`Send an email to ${email.link}`}
                >
                  Send Email <FiArrowUpRight aria-hidden="true" />
                </a>
                <button
                  className="contact-uplink__copy"
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  aria-busy={copyState === 'pending'}
                  aria-describedby="uplink-copy-status"
                  data-copied={copyState === 'copied'}
                >
                  {copyState === 'copied' ? (
                    <FiCheck aria-hidden="true" />
                  ) : (
                    <FiCopy aria-hidden="true" />
                  )}
                  <span>{copyState === 'copied' ? 'Copied!' : 'Copy email'}</span>
                </button>
              </div>
              <div
                id="uplink-copy-status"
                className="contact-uplink__copy-status"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {copyState === 'copied'
                  ? 'Address copied to clipboard.'
                  : copyState === 'error'
                    ? 'Copy unavailable. Please select the email address above.'
                    : ''}
              </div>
            </div>
            <MailHologram />
          </section>
          <div className="contact-uplink__conduit" aria-hidden="true">
            <svg viewBox="0 0 900 70" preserveAspectRatio="none">
              <path d="M450 0V19M450 19H150V70M450 19V70M450 19H750V70" />
              {active && (
                <path
                  key={active}
                  className="contact-uplink__trace"
                  data-trace={active}
                  pathLength="100"
                  d={paths[active]}
                />
              )}
              <circle cx="450" cy="19" r="6" />
              <circle className="contact-uplink__core" cx="450" cy="19" r="2" />
            </svg>
          </div>
          <ul className="contact-uplink__channels" aria-label="Other contact channels">
            {channels.map((contact) => {
              const key = contact.title.toLowerCase() as Channel;
              const { name, detail, Icon } = channelPresentation[key];
              const handle =
                new URL(contact.link).hostname.replace(/^www\./, '') +
                new URL(contact.link).pathname.replace(/\/$/, '');
              return (
                <li key={key}>
                  <a
                    className="contact-uplink__channel"
                    data-channel={key}
                    data-active={active === key}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerEnter={(event) => {
                      if (
                        event.pointerType !== 'touch' &&
                        window.matchMedia('(hover: hover)').matches
                      )
                        setHovered(key);
                    }}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                  >
                    <div className="contact-uplink__channel-top">
                      <span className="contact-uplink__icon">
                        <Icon aria-hidden="true" />
                      </span>
                    </div>
                    <div className="contact-uplink__channel-main">
                      <h2>{name}</h2>
                      <p>{detail}</p>
                    </div>
                    <div className="contact-uplink__channel-bottom">
                      <span>{handle}</span>
                      <FiArrowUpRight aria-hidden="true" />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </DefaultLayout>
    </div>
  );
}
