import { StarIcon } from "@/components/ui/StarIcon";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  kannada?: string;
  as?: "h1" | "h2" | "h3";
};

/** Display heading with a stellate divider. */
export function SectionHeading({
  eyebrow,
  title,
  kannada,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {eyebrow ? <p className="label-caps mb-3">{eyebrow}</p> : null}
      <Tag
        className="font-display text-fluid-h2 font-semibold tracking-wide text-bone"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </Tag>
      {kannada ? (
        <p className="font-kannada mt-2 text-fluid-h4 text-soapstone-200">{kannada}</p>
      ) : null}
      <span className="mt-5 flex items-center gap-3 text-lamp-500" aria-hidden>
        <span className="h-px w-16 bg-lamp-600/70" />
        <StarIcon className="h-4 w-4" />
        <span className="h-px w-16 bg-lamp-600/70" />
      </span>
    </header>
  );
}
