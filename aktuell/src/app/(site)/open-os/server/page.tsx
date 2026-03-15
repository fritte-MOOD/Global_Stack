import { Heading } from "@/components/ui/heading";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";

export default function OpenOSServerPage() {
  return (
    <section className="relative py-24 sm:py-32 bg-brand-25">
      <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-6">
        <Heading className="text-brand-950">
          OpenOS Server Dashboard
        </Heading>

        <p className="text-lg text-brand-950 max-w-prose text-center text-pretty leading-relaxed">
          This is where the OpenOS server administration interface will be implemented. 
          Manage your self-hosted OpenOS installation.
        </p>

        <div className="mt-8 p-8 rounded-xl border border-brand-200 bg-brand-50 w-full max-w-4xl">
          <div className="text-center text-brand-950">
            <p className="text-sm">OpenOS Server Dashboard</p>
            <p className="text-xs mt-1 text-brand-950">Coming soon...</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}