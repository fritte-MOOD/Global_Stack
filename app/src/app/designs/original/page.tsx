import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import NetworkDiagram from "@/components/NetworkDiagram";

export default function OriginalDesign() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-brand-25">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-brand-900 text-pretty">
              Infrastructure belongs to everyone.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-950 max-w-2xl mx-auto text-pretty leading-relaxed">
              Global Stack builds sovereign digital infrastructure — open,
              encrypted, and in the hands of the people who use it.
            </p>

            <Link
              href="/open-os"
              className="group relative z-10 mt-10 inline-flex items-center gap-2 px-8 h-14 rounded-md text-base font-medium text-brand-900 bg-brand-0 border border-brand-800 shadow-md shadow-brand-200 transition-all duration-300 hover:shadow-xl hover:border-transparent hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 hover:ring-offset-brand-25 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-brand-25"
            >
              Start Demo
              <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* Architecture diagram */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <NetworkDiagram />
          </div>
        </section>

        <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-brand-200">
          <div className="max-w-5xl mx-auto text-center text-sm text-brand-700">
            Global Stack — Open Infrastructure for a Decentralized World
          </div>
        </footer>
      </main>
    </>
  );
}