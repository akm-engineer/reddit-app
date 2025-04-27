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
