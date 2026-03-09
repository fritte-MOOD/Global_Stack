import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { DarkModeToggle } from "./darkModeToggle";

export const Navbar_landing = () => {
    return (
        <nav className="sticky z-[100] h-14 px-4 inset-x-0 top-0 width-full border-b border-brand-550 bg-brand-50 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="flex z-40 text-brand-901 font-bold text-lg">
                        <span className="text-brand-902">/</span>MOOD
                    </Link>
                    <div className="h-full flex items-center space-x-4">
                        <DarkModeToggle />
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}