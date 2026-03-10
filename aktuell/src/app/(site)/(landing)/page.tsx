import { Heading } from "@/components/ui/heading";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import ProjectWindow from "@/components/window-manager/windows/ProjectWindow";

export default function Page() {
  return (
    <section className="relative py-24 sm:py-32 bg-brand-25">
      <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-6">
        <Heading className="text-brand-900">
          We Support Free, Sovereign Communities!
        </Heading>

        <div className="text-lg text-brand-950 max-w-prose text-center text-pretty leading-relaxed">
          Host your own digital infrastructure with a few clicks in a guided
          environment. Free and Open Source! Try{" "}
          <ProjectWindow name="OpenOS" />, <ProjectWindow name="Mood" />,{" "}
          <ProjectWindow name="Forum" /> or <ProjectWindow name="Analytics" />.
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
