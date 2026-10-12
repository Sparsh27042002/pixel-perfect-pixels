import { ArrowRight, Info } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { services } from "@/components/home/data";
import { FormField, inputClass } from "./FormField";
import { PhotoPicker } from "./PhotoPicker";
import { timeOptions, todayISO, validateRequest, type RequestErrors, type ServiceRequest } from "./types";

export function ServiceRequestForm({
  initial, onSubmit,
}: { initial: ServiceRequest; onSubmit: (r: ServiceRequest) => void }) {
  const [data, setData] = useState<ServiceRequest>(initial);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [tried, setTried] = useState(false);

  function update<K extends keyof ServiceRequest>(key: K, value: ServiceRequest[K]) {
    const next = { ...data, [key]: value };
    setData(next);
    if (tried) setErrors(validateRequest(next));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    const errs = validateRequest(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onSubmit({ ...data, description: data.description.trim(), address: data.address.trim() });
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      {tried && errorCount > 0 && (
        <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/5 px-5 py-4 text-sm font-medium text-destructive">
          Please fill in the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
        </div>
      )}

      <fieldset id="field-service">
        <legend className="mb-3 text-base font-bold text-navy">What kind of help do you need?</legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map(({ slug, name, icon: Icon }) => {
            const active = data.service === slug;
            return (
              <button
                key={slug}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update("service", slug)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-card p-4 text-left font-semibold text-navy shadow-soft transition",
                  active ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary",
                )}
              >
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  active ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground")}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm sm:text-base">{name}</span>
              </button>
            );
          })}
        </div>
        {errors.service && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.service}</p>}
      </fieldset>

      <div id="field-description">
        <FormField id="description" label="Describe the problem" hint="What is happening, where, and since when?" error={errors.description}>
          <textarea
            id="description"
            rows={5}
            maxLength={1000}
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
            aria-invalid={!!errors.description}
            placeholder="e.g. The kitchen tap has been dripping for two days and water collects under the sink."
            className={cn(inputClass, "resize-y")}
          />
        </FormField>
        <p className="mt-1 text-right text-xs text-muted-foreground">{data.description.length}/1000</p>
      </div>

      <FormField id="photos" label="Add photos" optional hint="A photo can help a technician understand the problem.">
        <PhotoPicker photos={data.photos} onChange={(p) => update("photos", p)} />
      </FormField>

      <div id="field-address">
        <FormField id="address" label="Locality or address" error={errors.address}>
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            maxLength={300}
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            aria-invalid={!!errors.address}
            placeholder="e.g. 2nd Cross, Indiranagar, Bengaluru"
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div id="field-date">
          <FormField id="date" label="Preferred visit date" error={errors.date}>
            <input
              id="date"
              type="date"
              min={todayISO()}
              value={data.date}
              onChange={(e) => update("date", e.target.value)}
              aria-invalid={!!errors.date}
              className={inputClass}
            />
          </FormField>
        </div>
        <fieldset>
          <legend className="mb-2 text-base font-bold text-navy">
            Preferred time <span className="text-sm font-medium text-muted-foreground">(optional)</span>
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {timeOptions.map((t) => {
              const active = data.time === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update("time", active ? "" : t.value)}
                  className={cn("rounded-2xl border bg-card px-2 py-2.5 text-center transition",
                    active ? "border-primary ring-2 ring-primary" : "border-input hover:border-primary")}
                >
                  <span className="block text-sm font-semibold text-navy">{t.label}</span>
                  <span className="block text-xs text-muted-foreground">{t.range}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <PreliminaryNotice />

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lift transition hover:brightness-110 sm:w-auto"
      >
        Continue <ArrowRight className="h-5 w-5" />
      </button>
    </form>
  );
}

export function PreliminaryNotice() {
  return (
    <aside aria-label="About estimates" className="flex gap-3 rounded-2xl bg-accent p-5 text-accent-foreground">
      <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div className="text-sm">
        <p className="font-bold">Estimates will be preliminary</p>
        <p className="mt-1">
          In future, FixLocal may suggest possible causes and an estimated cost based on what you share. Any such
          assessment will only be a rough guide — the actual problem and final price can only be confirmed after a
          technician inspects it in person.
        </p>
      </div>
    </aside>
  );
}
