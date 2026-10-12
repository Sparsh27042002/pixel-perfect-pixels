import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { services } from "@/components/home/data";

type Search = { q?: string; service?: string; worker?: boolean };

export const Route = createFileRoute("/request")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    service: typeof s.service === "string" ? s.service : undefined,
    worker: s.worker === true || s.worker === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Service request (coming soon) — FixLocal" },
      { name: "description", content: "The FixLocal service request form is coming soon." },
      { property: "og:title", content: "Service request — FixLocal" },
      { property: "og:description", content: "The FixLocal service request form is coming soon." },
    ],
  }),
  component: RequestPage,
});

function RequestPage() {
  const { q, service, worker } = Route.useSearch();
  const svc = services.find((s) => s.slug === service);
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-accent text-accent-foreground">
          <ClipboardList className="h-8 w-8" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">Placeholder</p>
        <h1 className="mt-2 text-4xl font-extrabold text-navy">
          {worker ? "Technician sign-up form" : "Service request form"} — coming soon
        </h1>
        <p className="mt-4 text-muted-foreground">This is where you'll {worker ? "join as a technician" : "describe your problem and get matched with local help"}.</p>
        {(q || svc) && (
          <div className="mx-auto mt-6 inline-block rounded-2xl bg-card px-5 py-3 text-left shadow-soft">
            {svc && <p><span className="text-muted-foreground">Service:</span> <strong>{svc.name}</strong></p>}
            {q && <p><span className="text-muted-foreground">You searched:</span> <strong>"{q}"</strong></p>}
          </div>
        )}
        <div className="mt-8">
          <Link to="/" className="font-semibold text-primary hover:underline">← Back to home</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
