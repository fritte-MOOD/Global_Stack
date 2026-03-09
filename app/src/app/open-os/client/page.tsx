import Navigation from "@/components/Navigation";
import Link from "next/link";
import { ArrowLeft, Monitor, Tablet, Smartphone } from "lucide-react";

export default function ClientPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-25 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900 mb-4">
              OpenOS Client Experience
            </h1>
            <p className="text-lg text-brand-700 max-w-3xl mx-auto">
              Once OpenOS is installed on the server, users can access their personal workspace 
              from any device, anywhere in the world.
            </p>
          </div>

          {/* Device Previews */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Desktop */}
            <div className="bg-brand-50 rounded-xl border border-brand-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-6 h-6 text-brand-600" />
                <h3 className="text-xl font-semibold text-brand-900">Desktop</h3>
              </div>
              
              <div className="bg-brand-900 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-1 mb-2 bg-brand-800 rounded px-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-brand-700"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-700"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-700"></div>
                  <span className="text-[8px] text-brand-200 ml-2">OpenOS Desktop</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="bg-brand-600 rounded p-1 text-center">
                    <div className="text-white text-[10px]">📁</div>
                    <div className="text-[6px] text-white">Files</div>
                  </div>
                  <div className="bg-brand-300 rounded p-1 text-center">
                    <div className="text-brand-900 text-[10px]">⚖️</div>
                    <div className="text-[6px] text-brand-900 font-semibold">MOOD</div>
                  </div>
                  <div className="bg-brand-600 rounded p-1 text-center">
                    <div className="text-white text-[10px]">🤖</div>
                    <div className="text-[6px] text-white">AI</div>
                  </div>
                  <div className="bg-brand-700 rounded p-1 text-center">
                    <div className="text-white text-[10px]">⚙️</div>
                    <div className="text-[6px] text-white">Settings</div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-brand-700">
                Full desktop environment with window management, file access, and all community apps.
              </p>
            </div>

            {/* Tablet */}
            <div className="bg-brand-50 rounded-xl border border-brand-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Tablet className="w-6 h-6 text-brand-600" />
                <h3 className="text-xl font-semibold text-brand-900">Tablet</h3>
              </div>
              
              <div className="bg-brand-50 border border-brand-300 rounded-lg p-3 mb-4 mx-auto" style={{ width: '120px' }}>
                <div className="text-center text-[8px] text-brand-900 mb-2 font-semibold">OpenOS</div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="bg-brand-600 rounded p-1 text-center">
                        <div className="text-white text-[8px]">📁</div>
                        <div className="text-[5px] text-white">Files</div>
                      </div>
                      <div className="bg-brand-300 rounded p-1 text-center">
                        <div className="text-brand-900 text-[8px]">⚖️</div>
                        <div className="text-[5px] text-brand-900 font-semibold">MOOD</div>
                      </div>
                      <div className="bg-brand-600 rounded p-1 text-center">
                        <div className="text-white text-[8px]">🤖</div>
                        <div className="text-[5px] text-white">AI</div>
                      </div>
                      <div className="bg-brand-700 rounded p-1 text-center">
                        <div className="text-white text-[8px]">⚙️</div>
                        <div className="text-[5px] text-white">Settings</div>
                      </div>
                      <div className="bg-brand-600 rounded p-1 text-center">
                        <div className="text-white text-[8px]">🌐</div>
                        <div className="text-[5px] text-white">Browser</div>
                      </div>
                      <div className="bg-brand-600 rounded p-1 text-center">
                        <div className="text-white text-[8px]">📊</div>
                        <div className="text-[5px] text-white">Stats</div>
                      </div>
                    </div>
              </div>
              
              <p className="text-sm text-brand-700">
                Touch-optimized interface perfect for tablets and touch-screen devices.
              </p>
            </div>

            {/* Mobile */}
            <div className="bg-brand-50 rounded-xl border border-brand-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-brand-600" />
                <h3 className="text-xl font-semibold text-brand-900">Mobile</h3>
              </div>
              
              <div className="bg-brand-50 border border-brand-300 rounded-xl p-2 mb-4 mx-auto" style={{ width: '80px' }}>
                <div className="w-8 h-1 bg-brand-700 rounded-full mx-auto mb-1"></div>
                <div className="text-center text-[6px] text-brand-900 mb-1 font-semibold">OpenOS</div>
                    <div className="space-y-1">
                      <div className="bg-brand-600 rounded p-0.5 flex items-center gap-1">
                        <span className="text-[6px]">📁</span>
                        <span className="text-[4px] text-white">Files</span>
                      </div>
                      <div className="bg-brand-300 rounded p-0.5 flex items-center gap-1">
                        <span className="text-[6px]">⚖️</span>
                        <span className="text-[4px] text-brand-900 font-semibold">MOOD</span>
                      </div>
                      <div className="bg-brand-600 rounded p-0.5 flex items-center gap-1">
                        <span className="text-[6px]">🤖</span>
                        <span className="text-[4px] text-white">AI</span>
                      </div>
                      <div className="bg-brand-700 rounded p-0.5 flex items-center gap-1">
                        <span className="text-[6px]">⚙️</span>
                        <span className="text-[4px] text-white">Settings</span>
                      </div>
                    </div>
              </div>
              
              <p className="text-sm text-brand-700">
                Native mobile app with offline sync and push notifications.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-brand-50 rounded-xl border border-brand-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-brand-900 mb-6 text-center">
              Seamless Multi-Device Experience
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔄</span>
                </div>
                <h3 className="font-medium text-brand-900 mb-2">Real-time Sync</h3>
                <p className="text-sm text-brand-700">
                  Files, settings, and app data sync instantly across all your devices.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="font-medium text-brand-900 mb-2">End-to-End Encrypted</h3>
                <p className="text-sm text-brand-700">
                  All communication between devices and server is fully encrypted.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="font-medium text-brand-900 mb-2">Offline Ready</h3>
                <p className="text-sm text-brand-700">
                  Work offline and sync when connection is restored.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link 
              href="/open-os"
              className="inline-flex items-center gap-2 px-6 py-3 text-brand-700 hover:text-brand-900 border border-brand-300 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to OpenOS
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}