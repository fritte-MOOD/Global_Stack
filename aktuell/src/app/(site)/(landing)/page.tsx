import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import ProjectWindow from "@/components/window-manager/windows/ProjectWindow";

export default function Page() {
  return (
    <section className="relative py-24 sm:py-32 bg-brand-25">
      <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-6">
        <Heading className="text-brand-950">
          We Support Free, Sovereign Communities!
        </Heading>

        <div className="text-lg text-brand-950 max-w-prose text-center text-pretty leading-relaxed">
          Host your own digital infrastructure with a few clicks in a guided
          environment. Free and Open Source! Try{" "}
          <ProjectWindow name="OpenOS" />, <ProjectWindow name="Mood" />,{" "}
          <ProjectWindow name="Forum" /> or <ProjectWindow name="Analytics" />.
        </div>

        <Link
          href="/workspace/login"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-950 text-brand-0 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Try Workspace →
        </Link>
      </MaxWidthWrapper>
    </section>
  );
}
