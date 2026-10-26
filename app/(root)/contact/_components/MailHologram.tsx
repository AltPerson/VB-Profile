export default function MailHologram() {
  return (
    <div className="contact-uplink__art" aria-hidden="true">
      <svg viewBox="0 0 180 190" fill="none">
        <g stroke="#285d68" strokeWidth="1.2">
          <circle cx="90" cy="95" r="74" strokeDasharray="2 10" />
          <circle cx="90" cy="95" r="55" />
          <circle cx="90" cy="95" r="89" opacity=".55" strokeDasharray="22 18" />
          <path d="M12 49h19v18M149 141h19v-14" />
        </g>
        <path
          className="contact-uplink__mail-signal"
          d="M13 95H43M137 95h30M90 13v29M90 150v27"
          stroke="#5ef6ff"
          strokeWidth="1.5"
          strokeDasharray="4 7"
        />
        <path d="M48 72h84v51H48z" fill="#061b20" stroke="#5ef6ff" strokeWidth="1.4" />
        <path
          d="M48 73 90 103 132 73M48 122l28-27M132 122l-28-27"
          stroke="#72cdd6"
          strokeWidth="1.2"
        />
        <path d="M82 92h16v16H82z" fill="#061d24" stroke="#5ef6ff" />
        <circle cx="143" cy="40" r="4" fill="#f75049" />
        <circle cx="22" cy="142" r="3.5" fill="#f8ef00" />
      </svg>
    </div>
  );
}
