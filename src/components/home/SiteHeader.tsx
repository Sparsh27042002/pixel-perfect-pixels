import { Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { cities } from "./data";

export function Wordmark() {
  return (
    <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-navy">
      Fix<span className="text-primary">Local</span>
    </Link>
  );
}

export function SiteHeader() {
  const [city, setCity] = useState(cities[0]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Wordmark />
        <label className="ml-2 flex items-center gap-1 rounded-full bg-secondary px-3 py-2 text-sm font-medium">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          <span className="sr-only">Your city</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent outline-none">
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <form
          className="hidden flex-1 md:flex"
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/request-service", search: { q } }); }}
        >
          <div className="flex w-full items-center gap-2 rounded-full border border-input bg-card px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a service" aria-label="Search a service" className="w-full bg-transparent text-sm outline-none" />
          </div>
        </form>
        <a href="#" className="ml-auto text-sm font-semibold text-navy hover:text-primary md:ml-0">Sign in</a>
      </div>
    </header>
  );
}
