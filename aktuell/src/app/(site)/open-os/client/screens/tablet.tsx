/*
 * Tablet Screen — Inhalt des Tablet-Bildschirms in der OpenOS Client Demo.
 *
 * Wird in page.tsx im Tablet-Rahmen gerendert.
 * Hier kommt später die Tablet-optimierte OpenOS Oberfläche rein.
 */

export default function TabletScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="text-4xl">📱</div>
      <h3 className="font-heading text-lg font-semibold text-brand-950">
        OpenOS Tablet
      </h3>
      <p className="text-sm text-brand-950 max-w-sm">
        A touch-optimized interface for tablet-sized screens.
      </p>
      <span className="mt-2 text-xs text-brand-950 bg-brand-100 px-3 py-1 rounded-full">
        Coming soon
      </span>
    </div>
  );
}