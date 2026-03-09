import Navigation from "@/components/Navigation";
import Link from "next/link";
import { ArrowRight, Server, Monitor } from "lucide-react";

export default function OpenOSPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-25 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-900 mb-6">
              OpenOS
            </h1>
            <p className="text-xl sm:text-2xl text-brand-700 max-w-4xl mx-auto leading-relaxed">
              A NixOS-based operating system that turns any computer into a shared server. 
              Reproducible, declarative, and fully configurable for communities.
            </p>
            <p className="text-lg text-brand-950 max-w-3xl mx-auto mt-4 leading-relaxed">
              Install once, configure everything. Your hardware becomes a powerful shared resource 
              that multiple users can access securely from any device, anywhere.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Server-side View */}
            <div className="bg-brand-50 rounded-xl border border-brand-200 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-600 rounded-lg">
                  <Server className="w-6 h-6 text-brand-50" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-brand-900">Server-side</h2>
                  <p className="text-brand-700">Admin Installation & Management</p>
                </div>
              </div>
              
              {/* Server Preview */}
              <div className="bg-brand-900 rounded-lg p-4 mb-6 font-mono text-sm">
                <div className="text-brand-300 mb-2">$ sudo nixos-install</div>
                <div className="text-brand-200 mb-1">→ Configuring OpenOS features...</div>
                <div className="text-brand-200 mb-1">→ Setting up resource allocation...</div>
                <div className="text-brand-200 mb-1">→ Initializing user management...</div>
                <div className="text-brand-400">✓ OpenOS ready for community use</div>
              </div>

              <p className="text-brand-950 mb-6 leading-relaxed">
                Interactive installation wizard guides you through setting up OpenOS on your hardware. 
                Configure features, allocate resources, and create user accounts with just a few clicks.
              </p>

              <Link 
                href="/open-os/install"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-brand-50 rounded-lg font-medium transition-colors"
              >
                Start Installation Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Client-side View */}
            <div className="bg-brand-50 rounded-xl border border-brand-200 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-600 rounded-lg">
                  <Monitor className="w-6 h-6 text-brand-50" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-brand-900">Client-side</h2>
                  <p className="text-brand-700">User Experience & Access</p>
                </div>
              </div>

              {/* Client Preview */}
              <div className="bg-brand-50 border border-brand-300 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand-200">
                  <div className="w-3 h-3 bg-brand-700 rounded-full"></div>
                  <div className="w-3 h-3 bg-brand-700 rounded-full"></div>
                  <div className="w-3 h-3 bg-brand-700 rounded-full"></div>
                  <span className="text-sm text-brand-900 ml-2">OpenOS Desktop</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-brand-600 rounded p-2 text-center">
                    <div className="text-white text-xs">📁</div>
                    <div className="text-xs text-white mt-1">Files</div>
                  </div>
                  <div className="bg-brand-300 rounded p-2 text-center">
                    <div className="text-brand-900 text-xs">⚖️</div>
                    <div className="text-xs text-brand-900 mt-1 font-semibold">MOOD</div>
                  </div>
                  <div className="bg-brand-600 rounded p-2 text-center">
                    <div className="text-white text-xs">🤖</div>
                    <div className="text-xs text-white mt-1">AI</div>
                  </div>
                  <div className="bg-brand-700 rounded p-2 text-center">
                    <div className="text-white text-xs">⚙️</div>
                    <div className="text-xs text-white mt-1">Settings</div>
                  </div>
                </div>
              </div>

              <p className="text-brand-950 mb-6 leading-relaxed">
                Once OpenOS is installed, users can access their personal workspace from any device. 
                Desktop, mobile, or web — everything syncs seamlessly across the community server.
              </p>

              <Link 
                href="/open-os/client"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-brand-50 rounded-lg font-medium transition-colors"
              >
                Try Client Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-brand-700 mb-4">
              Ready to transform your hardware into a community server?
            </p>
            <Link 
              href="/open-os/install"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-lg font-medium text-lg transition-colors"
            >
              Begin OpenOS Installation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}