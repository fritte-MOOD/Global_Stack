import Navigation from "@/components/Navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Server, Cpu, HardDrive, Shield } from "lucide-react";

export default function InstallPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-25 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900 mb-4">
              OpenOS Installation Wizard
            </h1>
            <p className="text-lg text-brand-700">
              Transform your hardware into a community server in just a few steps
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 text-brand-50 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div className="w-12 h-1 bg-brand-200"></div>
              <div className="w-8 h-8 bg-brand-200 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div className="w-12 h-1 bg-brand-200"></div>
              <div className="w-8 h-8 bg-brand-200 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div className="w-12 h-1 bg-brand-200"></div>
              <div className="w-8 h-8 bg-brand-200 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">4</div>
              <div className="w-12 h-1 bg-brand-200"></div>
              <div className="w-8 h-8 bg-brand-200 text-brand-700 rounded-full flex items-center justify-center text-sm font-medium">5</div>
            </div>
          </div>

          {/* Welcome Step */}
          <div className="bg-brand-50 rounded-xl border border-brand-200 p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-brand-600 rounded-xl">
                <Server className="w-8 h-8 text-brand-50" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-brand-900">Welcome to OpenOS</h2>
                <p className="text-brand-700">Let's set up your community server</p>
              </div>
            </div>

            <div className="prose prose-brand max-w-none">
              <p className="text-brand-950 leading-relaxed mb-4">
                OpenOS is a NixOS-based operating system designed for shared computing. Instead of everyone 
                buying their own expensive hardware, your community can share one powerful server.
              </p>
              
              <h3 className="text-lg font-semibold text-brand-900 mb-3">What happens during installation:</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-brand-25 rounded-lg border border-brand-200">
                  <Shield className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-900">Configure Features</div>
                    <div className="text-sm text-brand-700">Security, networking, and system features</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-brand-25 rounded-lg border border-brand-200">
                  <Cpu className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-900">Allocate Resources</div>
                    <div className="text-sm text-brand-700">CPU, memory, and storage distribution</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-brand-25 rounded-lg border border-brand-200">
                  <HardDrive className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-900">Setup Storage</div>
                    <div className="text-sm text-brand-700">Disk partitioning and encryption</div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-100 border border-brand-300 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-brand-900 mb-2">💡 This is a simulation</h4>
                <p className="text-sm text-brand-700">
                  No actual installation will occur. This demo shows you the OpenOS setup process 
                  so you can understand how it works before installing on real hardware.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link 
              href="/open-os"
              className="inline-flex items-center gap-2 px-4 py-2 text-brand-700 hover:text-brand-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to OpenOS
            </Link>
            
            <Link 
              href="/open-os/install/features"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-brand-50 rounded-lg font-medium transition-colors"
            >
              Start Installation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}