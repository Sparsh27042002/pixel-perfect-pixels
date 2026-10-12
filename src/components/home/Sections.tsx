import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, MessageSquareText, Lightbulb, CalendarCheck, Receipt, Calculator, UserRound, Briefcase } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { services } from "./data";

const cta = "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lift transition hover:brightness-110";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-10 md:grid-cols-2 md:pt-16">
      <div>
        <p className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Local help for everyday home problems</p>
        <h1 className="text-4xl font-extrabold leading-[1.05] text-navy md:text-6xl">Home problems? Find the right person to fix them.</h1>
        <p className="mt-5 max-w-lg text-lg text-muted-foreground">Tell us what's wrong in simple words. FixLocal helps you understand the likely cause, see an idea of the cost, and connect with skilled technicians near you.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/request-service" className={cta}>Describe your problem <ArrowRight className="h-5 w-5" /></Link>
        </div>
      </div>
      <div className="relative">
        <img src={hero} alt="A technician repairing a switchboard in a home" width={1280} height={1024} className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft" />
      </div>
    </section>
  );
}

export function ProblemSearch() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/request-service", search: { q } }); }}
        className="flex flex-col gap-3 rounded-3xl bg-card p-3 shadow-soft sm:flex-row">
        <label className="flex flex-1 items-center gap-3 px-3">
          <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <span className="sr-only">What needs fixing?</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="What needs fixing at your home?" className="w-full bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground" />
        </label>
        <button type="submit" className="rounded-2xl bg-navy px-6 py-3 font-semibold text-navy-foreground hover:opacity-90">Find help</button>
      </form>
      <p className="mt-3 px-2 text-sm text-muted-foreground">Try: "kitchen tap is leaking" or "fan making noise"</p>
    </section>
  );
}

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-navy md:text-4xl">What do you need help with?</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {services.map(({ slug, name, icon: Icon, hint }) => (
          <Link key={slug} to="/request-service" search={{ service: slug }}
            className="group rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:border-primary hover:shadow-lift md:p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { icon: MessageSquareText, title: "Describe your problem", text: "Type or choose what's wrong — no technical words needed." },
  { icon: Lightbulb, title: "Understand causes & costs", text: "See possible causes and an estimated cost range before anyone visits." },
  { icon: CalendarCheck, title: "Book a local technician", text: "Pick a nearby technician and a time that suits you." },
];

export function HowItWorks() {
  return (
    <section className="bg-secondary py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-navy md:text-4xl">How it works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-3xl bg-card p-7 shadow-soft">
              <div className="flex items-center justify-between">
                <Icon className="h-7 w-7 text-primary" aria-hidden />
                <span className="font-display text-4xl font-extrabold text-border">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const trust = [
  { icon: Receipt, title: "Visiting charges shown upfront", text: "Each technician's visiting charge will be displayed before you book, so there are no surprises at the door." },
  { icon: Calculator, title: "Indicative repair estimates", text: "You'll see a typical price range for common jobs. Final cost depends on what the technician finds on inspection." },
  { icon: UserRound, title: "Clear technician profiles", text: "Profiles will list skills, service area and experience as shared by the technician themselves." },
];

export function Trust() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="max-w-2xl text-3xl font-bold text-navy md:text-4xl">Know what you're paying for — before you book</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {trust.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-border p-7">
            <Icon className="h-7 w-7 text-primary" aria-hidden />
            <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
            <p className="mt-2 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ForWorkers() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="flex flex-col items-start gap-6 rounded-[2rem] bg-navy p-8 text-navy-foreground md:flex-row md:items-center md:justify-between md:p-12">
        <div className="max-w-xl">
          <Briefcase className="h-8 w-8 text-primary" aria-hidden />
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Are you a skilled technician?</h2>
          <p className="mt-3 opacity-80">Join FixLocal to receive job requests from households in your area. Set your own visiting charge and choose the jobs you want.</p>
        </div>
        <Link to="/request" search={{ worker: true }} className={cta}>Join as a technician</Link>
      </div>
    </section>
  );
}
