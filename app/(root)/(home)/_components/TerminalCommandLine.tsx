export default function TerminalCommandLine({
  text,
  count,
  active = false,
  id,
}: {
  text: string;
  count?: number;
  active?: boolean;
  id?: string;
}) {
  return (
    <p
      className="personal-terminal__command"
      data-started={count === undefined || count > 0 || active}
    >
      <span aria-hidden="true">›</span>
      <code>
        <span className="personal-terminal__sr">{text}</span>
        <span
          aria-hidden="true"
          className="personal-terminal__typed"
          data-typing-id={id}
          data-count={count ?? Array.from(text).length}
        >
          {Array.from(text)
            .slice(0, count ?? Array.from(text).length)
            .join('')}
          {active && <i className="personal-terminal__typing-cursor">▌</i>}
        </span>
      </code>
    </p>
  );
}
