import Link from "next/link";
import { ArrowRight, Palette, MousePointer, Layers } from "lucide-react";
import Navigation from "@/components/Navigation";

interface DesignOption {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  status: "active" | "coming-soon";
  preview?: string;
}

const designs: DesignOption[] = [
  {
    id: "interactive",
    title: "Interactive Explorer",
    description: "Click-to-explore sections with expandable content areas",
    href: "/designs/interactive",
    icon: <MousePointer className="w-6 h-6" />,
    status: "active",
    preview: "Hover & click interactions, persistent sections"
  },
  {
    id: "original",
    title: "Original Design",
    description: "Clean hero section with network diagram below",
    href: "/designs/original", 
    icon: <Layers className="w-6 h-6" />,
    status: "active",
    preview: "Classic layout with architecture visualization"
  },
  {
    id: "minimal",
    title: "Minimal Focus",
    description: "Single call-to-action with minimal distractions",
    href: "/designs/minimal",
    icon: <Palette className="w-6 h-6" />,
    status: "coming-soon",
    preview: "Ultra-clean, conversion-focused design"
  }
];

export default function DesignLab() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-brand-25">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-brand-900 text-pretty">
              Design Lab
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-700 max-w-2xl mx-auto text-pretty leading-relaxed">
              Explore different homepage designs and choose what resonates with you
            </p>
          </div>
        </section>

        {/* Design Options */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className={`
                    group relative bg-brand-50 border border-brand-200 rounded-xl p-6 transition-all duration-300
                    ${design.status === 'active' 
                      ? 'hover:shadow-lg hover:border-brand-300 cursor-pointer' 
                      : 'opacity-60 cursor-not-allowed'
                    }
                  `}
                >
                  {design.status === 'coming-soon' && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-brand-300 text-brand-900 text-xs font-medium rounded">
                      Coming Soon
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-brand-600 text-brand-50 rounded-lg">
                      {design.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-brand-900 mb-2">
                        {design.title}
                      </h3>
                      <p className="text-brand-700 text-sm leading-relaxed">
                        {design.description}
                      </p>
                    </div>
                  </div>

                  {design.preview && (
                    <div className="mb-4 p-3 bg-brand-25 border border-brand-200 rounded-lg">
                      <p className="text-xs text-brand-600 font-medium mb-1">Preview:</p>
                      <p className="text-sm text-brand-700">{design.preview}</p>
                    </div>
                  )}

                  {design.status === 'active' ? (
                    <Link
                      href={design.href}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-brand-50 rounded-lg font-medium transition-colors text-sm"
                    >
                      View Design
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-200 text-brand-600 rounded-lg font-medium text-sm">
                      Coming Soon
                    </div>
                  )}

                  {/* Hover effect for active designs */}
                  {design.status === 'active' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-300/5 to-brand-300/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>

            {/* Quick Access */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 p-6 bg-brand-50 border border-brand-200 rounded-xl">
                <div className="text-2xl">🚀</div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-brand-900">Skip to the demo?</h3>
                  <p className="text-brand-700">Go directly to the OpenOS installation simulation</p>
                </div>
                <Link
                  href="/open-os"
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-brand-50 rounded-lg font-medium transition-colors"
                >
                  Start Demo
                </Link>
              </div>
            </div>
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
