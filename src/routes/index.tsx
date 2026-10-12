import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Hero, ProblemSearch, Services, HowItWorks, Trust, ForWorkers } from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FixLocal — Find local technicians for home repairs" },
      { name: "description", content: "Describe your home problem, understand likely costs, and book nearby plumbers, electricians and carpenters." },
      { property: "og:title", content: "FixLocal — Find local technicians for home repairs" },
      { property: "og:description", content: "Describe your home problem and connect with skilled technicians near you." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSearch />
        <Services />
        <HowItWorks />
        <Trust />
        <ForWorkers />
      </main>
      <SiteFooter />
    </div>
  );
}
