import { Link } from "@tanstack/react-router";
import { FlaskConical, Pencil } from "lucide-react";
import type { ReactNode } from "react";
import { services } from "@/components/home/data";
import { timeOptions, type ServiceRequest } from "./types";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border py-4 last:border-0 sm:grid-cols-[180px_1fr]">
      <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
      <dd className="text-navy">{children}</dd>
    </div>
  );
}

export function RequestSummary({ request, onEdit }: { request: ServiceRequest; onEdit: () => void }) {
  const service = services.find((s) => s.slug === request.service);
  const time = timeOptions.find((t) => t.value === request.time);
  const date = new Date(`${request.date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="space-y-6">
      <div role="status" className="flex gap-3 rounded-2xl border-2 border-dashed border-primary bg-card p-5">
        <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="text-sm text-navy">
          <p className="font-bold">This is a prototype</p>
          <p className="mt-1 text-muted-foreground">
            Your request has <strong className="text-navy">not</strong> been sent anywhere. No booking has been made and no
            technician has been contacted. These details are only shown here and will be lost when you leave this page.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
        <h2 className="text-2xl font-bold text-navy">Your request summary</h2>
        <dl className="mt-4">
          <Row label="Service">{service?.name ?? request.service}</Row>
          <Row label="Problem"><p className="whitespace-pre-line">{request.description}</p></Row>
          <Row label="Photos">
            {request.photos.length === 0 ? (
              <span className="text-muted-foreground">No photos added</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {request.photos.map((p) => (
                  <img key={p.id} src={p.url} alt={p.file.name} className="h-20 w-20 rounded-xl object-cover" />
                ))}
              </div>
            )}
          </Row>
          <Row label="Locality / address">{request.address}</Row>
          <Row label="Preferred date">{date}</Row>
          <Row label="Preferred time">{time ? `${time.label} (${time.range})` : <span className="text-muted-foreground">Any time</span>}</Row>
        </dl>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-card px-6 py-3.5 font-semibold text-navy hover:border-primary"
        >
          <Pencil className="h-4 w-4" /> Edit details
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3.5 font-semibold text-navy-foreground hover:opacity-90"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
