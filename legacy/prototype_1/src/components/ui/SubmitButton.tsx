import { cn } from "@/components/functions/utils"
import { ArrowRight } from "lucide-react"
import { ButtonHTMLAttributes } from "react"

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SubmitButton = ({
                               className,
                               children,
                               ...props
                             }: SubmitButtonProps) => {
  return (
      <button
          className={cn(
              // Base styles
              "group bg-brand-0 relative z-10 flex items-center justify-center gap-2",
              "w-80 h-14 px-8 rounded-md",
              "text-base font-medium whitespace-nowrap",
              "border border-brand-800",
              "overflow-hidden",

              // Transitions
              "transition-all duration-300",

              // Shadow
              "shadow-md shadow-brand-200",
              "hover:shadow-xl",

              // Hover and focus states
              "hover:border-transparent hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 hover:ring-offset-brand-25",
              "focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-brand-25",

              // Custom className
              className
          )}
          {...props}
      >
      <span className="relative z-10 flex items-center gap-2 text-brand-900">
        {children}
        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
      </span>

        <div
            className="absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-brand-300 opacity-20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-[120%]"
        />
      </button>
  )
}