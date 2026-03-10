import { Heading } from "@/components/ui/heading";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import Link from "next/link";
import { Monitor, Server, ArrowRight } from "lucide-react";

export default function OpenOSPage() {
  return (
    <section className="relative py-24 sm:py-32 bg-brand-25">
      <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-8">
        <Heading className="text-brand-950">
          OpenOS — Self-Hosted Browser Operating System
        </Heading>

        <p className="text-lg text-brand-950 max-w-2xl text-center text-pretty leading-relaxed">
          Experience a complete operating system that runs in your browser. 
          Choose your perspective below to explore OpenOS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
          {/* Client View */}
          <div className="group relative">
            <a
              href="/open-os/client"
              className="block p-8 rounded-xl border border-brand-200 bg-brand-50 shadow-sm hover:shadow-md hover:border-brand-800 transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 rounded-full bg-brand-100 group-hover:bg-brand-200 transition-colors">
                  <Monitor className="size-12 text-brand-950" />
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-brand-950">
                  Client View
                </h3>
                
                <p className="text-brand-950 leading-relaxed">
                  Experience OpenOS as an end user. Browse the desktop, 
                  launch applications, and interact with the system interface.
                </p>
                
                <span className="inline-flex items-center text-sm font-medium text-brand-950 group-hover:text-brand-1">
                  Launch Client →
                </span>
              </div>
            </a>
          </div>

          {/* Server View */}
          <div className="group relative">
            <a
              href="/open-os/server"
              className="block p-8 rounded-xl border border-brand-200 bg-brand-50 shadow-sm hover:shadow-md hover:border-brand-800 transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 rounded-full bg-brand-100 group-hover:bg-brand-200 transition-colors">
                  <Server className="size-12 text-brand-950" />
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-brand-950">
                  Server View
                </h3>
                
                <p className="text-brand-950 leading-relaxed">
                  Manage your OpenOS installation. Configure settings, 
                  monitor system resources, and administer user accounts.
                </p>
                
                <span className="inline-flex items-center text-sm font-medium text-brand-950 group-hover:text-brand-1">
                  Open Dashboard →
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Workspace CTA */}
        <div className="mt-8 pt-8 border-t border-brand-200 w-full max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <p className="text-sm text-brand-700 text-center sm:text-left">
              Want to use OpenOS for your community? Create a persistent workspace with your own data.
            </p>
            <Link
              href="/workspace"
              className="group shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-brand-800 bg-brand-0 text-brand-900 hover:shadow-md transition-all cursor-pointer"
            >
              Open Workspace
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}