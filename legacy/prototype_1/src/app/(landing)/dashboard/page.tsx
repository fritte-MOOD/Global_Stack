"use client"

import { useName } from "@/context/ContextFiles/NameContext"
import { useGroup } from "@/context/ContextFiles/GroupContext"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { Heading } from "@/components/ui/heading"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { ButtonLandingPage } from "@/components/ui/ButtonLandingPage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Drama, Home, Volleyball } from "lucide-react"

export default function Dashboard() {
  const { name } = useName() || { name: "Alex" }
  const { setGroupName } = useGroup()
  const { activateMainAndSubs } = useCheckbox()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const handleGroupChange = (group: string) => {
    setGroupName(group)
    activateMainAndSubs(group)
    router.push("/about")
  }

  return (
    <section className="relative py-24 sm:py-32 ">
      <MaxWidthWrapper className="text-center relative mx-auto flex flex-col items-center gap-10">
        <Heading className={"text-brand-900"}>Welcome back, {name}</Heading>
        <p className="text-xl text-brand-950  max-w-prose text-center text-pretty">
          You are living in the small town of <span className="font-bold text-brand-900">Rochefort</span>, <br />
          are an executive member of the local <span className="font-bold text-brand-900">Sports Club</span> and <br />
          live in a community housing project named <span className="font-bold text-brand-900">Marin Quarter</span>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-[280px] p-6 bg-brand-50 shadow-md rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                <Volleyball className="text-brand-900" />
                <span className="" >Park Sports Club RF</span>
              </div>
              <p className="text-base/7 text-brand-950 w-full text-center mt-2">
                122 Users, 7 Subgroups <br />
                You are an Admin and a Moderator.
              </p>
            </div>
            <div onClick={() => handleGroupChange("Park Club")}>
              <ButtonLandingPage
                href={`/about`}
                className="w-full"
              >
                Explore Example
              </ButtonLandingPage>
            </div>
          </div>

          <div className="h-[280px] p-6 flex bg-brand-50 shadow-md rounded-lg flex-col justify-between">
            <div>
              <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                <Drama className="text-brand-900" />
                <span>Municipality of Rochefort</span>
              </div>
              <p className="text-base/7 text-brand-950 w-full text-center mt-2">
                14,840 Users, 53 Subgroups <br />
                You are a User.
              </p>
            </div>
            <div onClick={() => handleGroupChange("Rochefort")}>
              <ButtonLandingPage
                href={`/about`}
                className="w-full"
              >
                Explore Example
              </ButtonLandingPage>
            </div>
          </div>

          <div className="h-[280px] p-6 bg-brand-50 shadow-md rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
                <Home className="text-brand-900" />
                <span>Marin Quarter Community</span>
              </div>
              <p className="text-base/7 text-brand-950 w-full text-center mt-2">
                98 Users, 14 Subgroups <br />
                You are a Moderator.
              </p>
            </div>
            <div onClick={() => handleGroupChange("Marin Quarter")}>
              <ButtonLandingPage
                href={`/about`}
                className="w-full"
              >
                Explore Example
              </ButtonLandingPage>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}