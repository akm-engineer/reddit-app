"use client"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Clock04Icon,
  Crown02Icon,
  Home07Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { PremiumDialog } from "./premium.dialog"

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      icon: <HugeiconsIcon icon={Home07Icon} />,
      title: "Home",
      href: "/",
    },
    {
      icon: <HugeiconsIcon icon={Clock04Icon} />,
      title: "Recent videos",
      href: "/recent",
    },
  ]

  return (
    <Sidebar className="border bg-[#1C1C1C] border-[#333] my-8 ml-8 h-[90vh] rounded-xl ">
      <SidebarHeader className="p-4 pb-2 flex justify-center items-center">
        <Link href="/" className="flex items-end gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white text-black font-bold">
            D
          </div>
          <span className="text-white font-bold">reamclip</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarMenu className="px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "text-gray-400 px-4 py-5",
                    isActive &&
                      "bg-[#101010] text-[#805AD5] hover:bg-[#101010] hover:text-[#805AD5] "
                  )}
                >
                  <Link href={item.href}>
                    {item?.icon}
                    <span>{item?.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarMenu className="px-2 py-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="bg-[#1e1e1e] text-white">
              <Link
                href="#"
                className="flex items-center justify-center w-full h-16"
              >
                <PremiumDialog>
                  <div className="flex items-center gap-3 h-full py-3 ">
                    <div className="p-2.5 flex items-center justify-center bg-white text-black rounded-full ">
                      <HugeiconsIcon icon={Crown02Icon} className="size-5" />
                    </div>
                    <div className="flex flex-col items-start text-white py-6">
                      <span className="text-sm font-medium ">Upgrade Plan</span>
                      <span className="text-xs ">Get premium features</span>
                    </div>
                  </div>
                </PremiumDialog>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
