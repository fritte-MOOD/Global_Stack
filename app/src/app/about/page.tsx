import Navigation from "@/components/Navigation";

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-brand-25 pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-900 mb-6">
            About Global Stack
          </h1>
          <div className="max-w-none">
            <p className="text-lg text-brand-700 mb-4">
              Global Stack is an open project for decentralizing the digital world.
            </p>
            <p className="text-brand-700">
              More information coming soon.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
