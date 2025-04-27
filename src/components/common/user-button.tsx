"use client"

// import { useSession } from "@/lib/providers/session-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./user-avatar"
import Link from "next/link"
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react"
// import { logout } from "@/server/actions/authActions"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useQueryClient } from "@tanstack/react-query"

export const UserButton = ({ className }: { className?: string }) => {
  // const { user } = useSession()
  const queryClient = useQueryClient()
  const { theme, setTheme } = useTheme()
  const user = {
    avatarUrl: "",
    name: "Lalitya Sahu",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-lg", className)}>
          <div className="w-min p-2.5 bg-[#272727] rounded-lg flex gap-2 items-center">
            <UserAvatar
              avatarUrl={user?.avatarUrl}
              name={user?.name}
              size={34}
            />

            <span className="hidden md:block whitespace-nowrap text-[#808080] text-sm font-semibold">
              {user?.name}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/${user?.name}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System Default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear()
            // void logout()
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
