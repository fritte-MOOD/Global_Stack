"use client"

import { Heading } from "@/components/ui/heading"
import { ButtonLandingPage } from "@/components/ui/ButtonLandingPage"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { Check } from "lucide-react"

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-10">

          <Heading className="text-brand-900">Be one Cell of the Brain!</Heading>

          <p className="text-xl text-brand-1  max-w-prose text-center text-pretty">
            Freedom comes with Responsibility:
            Engage, Deliberate and Participate in your Group and make Decisions meaningful.
          </p>

          <p className="text-base/7 text-brand-950 max-w-prose text-center text-pretty">
            This tool will help you and your group to give and receive feedback, organize discussions and monitor your
            voted decision makers. Be constructive as a group, create trust and minimize the effort discussing goals
            and strategies.
          </p>

          <p className="text-base/7 text-brand-950 max-w-prose text-center text-pretty">
            Enhance the workflow of your team or group such as:
          </p>

          <ul className="space-y-2 text-base/7 text-brand-950 text-left flex flex-col item-start">
            {[
              "Sports Clubs",
              "Municipalities",
              "Communities",
              "Education Institutions",
              "Non-Profit Organizations",
              "Companies",
              "And More! ...Maybe Families? Or Political Parties? ",
            ].map((item, index) => (
              <li key={index} className="flex gap-2 items-center text-left">
                <Check className="size-7 font-xl shrink-0 text-brand-900" />
                {item}
              </li>
            ))}
          </ul>

          <ButtonLandingPage
            href="/discover"
            className="">
            Start Demo
          </ButtonLandingPage>

        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page