import { StarIcon } from "./icons";

type Props = {
  words: readonly string[];
  className?: string;
  reverse?: boolean;
  speed?: string;
};

export function Marquee({ words, className = "", reverse, speed }: Props) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center gap-8 pr-8">
          <span>{w}</span>
          <StarIcon className="size-[0.5em] shrink-0 text-mustard" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee-wrap overflow-hidden whitespace-nowrap font-display ${className}`}>
      <div className="marquee" data-reverse={reverse || undefined} style={speed ? ({ "--speed": speed } as React.CSSProperties) : undefined}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
