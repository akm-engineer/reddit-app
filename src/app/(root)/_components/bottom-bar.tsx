// "use client"

// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { Clock04Icon, Home07Icon, User02Icon } from "@hugeicons/core-free-icons"
// import { HugeiconsIcon } from "@hugeicons/react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export const BottomBar = ({ className }: { className?: string }) => {
//   const pathname = usePathname()

//   return (
//     <div
//       className={cn(
//         "bg-[#1c1c1c] sticky bottom-0 flex w-full justify-between border-t px-12 py-3 sm:hidden",
//         className
//       )}
//     >
//       <Button
//         variant={"ghost"}
//         className="flex items-center justify-start gap-2 bg-[#805AD5]/35 text-[#805AD5] rounded-full"
//         title="Home"
//         asChild
//       >
//         <Link href="/">
//           <HugeiconsIcon icon={Home07Icon} />
//           <span className="inline">Home</span>
//         </Link>
//       </Button>
//       <Button
//         variant={"ghost"}
//         className="flex items-center justify-start gap-3"
//         title="Notifications"
//         asChild
//       >
//         <Link href="/notifications">
//           <HugeiconsIcon icon={Clock04Icon} />{" "}
//           <span className="inline">Recent videos</span>
//         </Link>
//       </Button>

//       <Button
//         variant={"ghost"}
//         className="flex items-center justify-start gap-3"
//         title="Notifications"
//         asChild
//       >
//         <Link href="/notifications">
//           <HugeiconsIcon icon={User02Icon} />{" "}
//           <span className="inline">Profile</span>
//         </Link>
//       </Button>
//     </div>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Clock04Icon, Home07Icon, User02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home07Icon,
  },
  {
    href: "/recent",
    label: "Recent videos",
    icon: Clock04Icon,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User02Icon,
  },
]

export const BottomBar = ({ className }: { className?: string }) => {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-[#1c1c1c] sticky bottom-0 flex w-full justify-evenly border-t px-8 py-3 sm:hidden",
        className
      )}
    >
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href
        return (
          <Button
            key={href}
            variant="ghost"
            className={cn(
              "flex items-center justify-center gap-2 transition-all rounded-full",
              isActive && "bg-[#805AD5]/35 text-[#805AD5] px-4",
              !isActive && "text-white px-3"
            )}
            title={label}
            asChild
          >
            <Link href={href}>
              <HugeiconsIcon icon={icon} />
              {isActive && <span className="inline text-sm">{label}</span>}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
