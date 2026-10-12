import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { services } from "@/components/home/data";
import { ServiceRequestForm } from "@/components/request/ServiceRequestForm";
import { RequestSummary } from "@/components/request/RequestSummary";
import type { ServiceRequest } from "@/components/request/types";

type Search = { service?: string | undefined; q?: string | undefined };

export const Route = createFileRoute("/request-service")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s["service"] === "string" ? s["service"] : undefined,
    q: typeof s["q"] === "string" ? s["q"].slice(0, 1000) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Tell us what needs fixing — FixLocal" },
      { name: "description", content: "Describe your home problem, add photos and choose a preferred visit time." },
      { property: "og:title", content: "Tell us what needs fixing — FixLocal" },
      { property: "og:description", content: "Describe your home problem, add photos and choose a preferred visit time." },
    ],
  }),
  component: RequestServicePage,
});

function RequestServicePage() {
  const { service, q } = Route.useSearch();
  const [initial] = useState<ServiceRequest>(() => ({
    service: services.some((s) => s.slug === service) ? service! : "",
    description: q ?? "",
    address: "",
    date: "",
    time: "",
    photos: [],
  }));
  const [draft, setDraft] = useState<ServiceRequest>(initial);
  const [submitted, setSubmitted] = useState(false);

  function go(next: boolean) {
    setSubmitted(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-navy md:text-5xl">
          {submitted ? "Here's what you told us." : "Tell us what needs fixing."}
        </h1>
        <p className="mt-3 mb-8 text-lg text-muted-foreground">
          {submitted ? "Check your details below." : "Answer a few simple questions. It takes about two minutes."}
        </p>
        {submitted ? (
          <RequestSummary request={draft} onEdit={() => go(false)} />
        ) : (
          <ServiceRequestForm initial={draft} onSubmit={(r) => { setDraft(r); go(true); }} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
