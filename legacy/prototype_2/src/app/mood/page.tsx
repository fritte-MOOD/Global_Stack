import Navigation from "@/components/Navigation";

export default function MoodPage() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-brand-25 pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-900 mb-6">
            MOOD
          </h1>
          <p className="text-xl text-brand-700">
            Coming soon: Deliberation platform
          </p>
        </div>
      </main>
    </>
  );
}
