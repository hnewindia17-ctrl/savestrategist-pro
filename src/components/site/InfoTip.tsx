import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function InfoTip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`More about ${label}`}
          className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[16rem] text-xs leading-relaxed">{children}</TooltipContent>
    </Tooltip>
  );
}

export function FieldLabel({
  title,
  tip,
  htmlFor,
}: {
  title: string;
  tip?: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
    >
      {title}
      {tip ? <InfoTip label={title}>{tip}</InfoTip> : null}
    </label>
  );
}
