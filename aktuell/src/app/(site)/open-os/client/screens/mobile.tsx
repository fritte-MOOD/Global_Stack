/*
 * Mobile Screen — Inhalt des Mobile-Bildschirms in der OpenOS Client Demo.
 *
 * Wird in page.tsx im Phone-Rahmen gerendert.
 * Hier kommt später die Mobile-optimierte OpenOS Oberfläche rein.
 */

export default function MobileScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="text-3xl">📲</div>
      <h3 className="font-heading text-base font-semibold text-brand-900">
        OpenOS Mobile
      </h3>
      <p className="text-xs text-brand-950 max-w-[200px]">
        A compact interface designed for phones.
      </p>
      <span className="mt-2 text-xs text-brand-700 bg-brand-100 px-3 py-1 rounded-full">
        Coming soon
      </span>
    </div>
  );
}