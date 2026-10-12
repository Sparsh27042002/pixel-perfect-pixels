import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

export function FormField({
  id, label, optional, hint, error, children,
}: { id: string; label: string; optional?: boolean; hint?: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-bold text-navy">
        {label} {optional && <span className="text-sm font-medium text-muted-foreground">(optional)</span>}
      </label>
      {hint && <p className="-mt-1 mb-2 text-sm text-muted-foreground">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
