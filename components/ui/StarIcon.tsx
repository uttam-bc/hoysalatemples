/** Reusable eight-point stellate star used across UI, map nodes, and motifs. */
type StarIconProps = {
  className?: string;
  title?: string;
};

export function StarIcon({ className, title }: StarIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M16 1.5 L18.4 11.2 L28.5 9.1 L21.2 16 L28.5 22.9 L18.4 20.8 L16 30.5 L13.6 20.8 L3.5 22.9 L10.8 16 L3.5 9.1 L13.6 11.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
