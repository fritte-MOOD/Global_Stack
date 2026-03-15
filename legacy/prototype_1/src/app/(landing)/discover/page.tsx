"use client"

import { Heading } from "@/components/ui/heading"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { useName } from "@/context/ContextFiles/NameContext"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/components/functions/utils" // Assuming cn is imported from a utility file

export default function NameForm() {
  const router = useRouter()
  const defaultNames = ["Alex", "Charlie", "Noa", "Sam", "Robin", "Sascha", "Toni"]

  const [localName, setLocalName] = useState<string>("")
  const { setName } = useName()
  const [randomName, setRandomName] = useState<string>("")
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setRandomName(defaultNames[Math.floor(Math.random() * defaultNames.length)])
    setIsClient(true)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(event.target.value)
  }

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (localName === "") {
      setName(randomName)
    } else {
      setName(localName)
    }
    router.push("/dashboard")
  }

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <Heading className="text-brand-900">Demo Platform</Heading>
            <p className="text-base/7 text-brand-950 text-center text-pretty">
              Experience three groups: a Company, a Sportsclub and a Municipality. <br />
              All content is exemplary and some functions are not working yet! <br />
              This is only a UI design.
            </p>

            <div className="px-7 py-2.5 flex flex-col items-center">
              <form onSubmit={formSubmit} className="flex flex-col items-center border-brand-800 hover:ring-brand-300 w-full max-w-[416px]">
                <p className="text-base/7 text-brand-950 text-center text-pretty mb-4">
                  Enter any firstname to get started with the experience:
                </p>
                <input
                  className={cn(
                    // Base styles
                    "w-80 h-14 px-4 rounded-md",
                    "text-base font-medium text-center text-brand-950",
                    "bg-brand-0 border border-brand-800",

                    // Shadow
                    "shadow-md shadow-brand-200",
                    "hover:shadow-xl",

                    // Transitions
                    "transition-all duration-300",

                    // Focus and hover states
                    "hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 hover:ring-offset-brand-25",
                    "focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-brand-25",
                      "[&:focus::placeholder]:text-transparent"
                  )}
                  onChange={handleChange}
                  type="text"
                  value={localName}
                  placeholder={isClient ? (localName === "" ? randomName : "") : "Loading..."}
                />
                <div className="py-5"></div>

                <SubmitButton
                  className=""
                >
                  Start Demo
                </SubmitButton>
              </form>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}