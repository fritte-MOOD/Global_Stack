import Navigation from "@/components/Navigation";

export default function OpenOSPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-25 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-900 mb-6">
            Open OS
          </h1>
          <p className="text-xl text-brand-700">
            Coming soon: Interactive NixOS installation demo
          </p>
        </div>
      </main>
    </>
  );
}
