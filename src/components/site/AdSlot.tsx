import { cn } from "@/lib/utils";

/**
 * Placeholder container for a Google AdSense unit. Drop the real
 * <ins class="adsbygoogle"> markup inside once the account is approved.
 */
export function AdSlot({
  label,
  size,
  className,
}: {
  label: string;
  size: string;
  className?: string;
}) {
  return (
    <aside
      aria-label={`Advertisement slot: ${label}`}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 px-4 py-6 text-center",
        className,
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
        Advertisement
      </span>
      <span className="mt-1 text-xs text-muted-foreground">
        {label} · {size}
      </span>
    </aside>
  );
}
