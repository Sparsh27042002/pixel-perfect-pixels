import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">Connecting households with independent local technicians.</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-navy">Explore</span>
          <a href="#" className="text-muted-foreground hover:text-primary">Services</a>
          <a href="#" className="text-muted-foreground hover:text-primary">How it works</a>
          <a href="#" className="text-muted-foreground hover:text-primary">For technicians</a>
        </nav>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-navy">Contact</span>
          <span>hello@fixlocal.example</span>
          <span>+91 00000 00000</span>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© 2026 FixLocal (working name)</p>
    </footer>
  );
}
