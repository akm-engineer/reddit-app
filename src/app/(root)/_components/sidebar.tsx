import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Clock04Icon,
  Crown02Icon,
  Home07Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-[#1c1c1c] ", className)}>
      <div className="hidden sm:flex items-center justify-center p-2">
        <h1 className="text-4xl font-black">
          D <span className="text-2xl font-normal -ml-1.5">reamclip</span>
        </h1>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-3">
          <Button
            variant={"ghost"}
            className="flex items-center justify-start gap-3"
            title="Home"
            asChild
          >
            <Link href="/">
              <HugeiconsIcon icon={Home07Icon} />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </Button>
          <Button
            variant={"ghost"}
            className="flex items-center justify-start gap-3"
            title="Notifications"
            asChild
          >
            <Link href="/notifications">
              <HugeiconsIcon icon={Clock04Icon} />{" "}
              <span className="hidden lg:inline">Recent videos</span>
            </Link>
          </Button>
        </div>

        <Button
          variant={"ghost"}
          className="flex items-center justify-start gap-3 mt-auto"
          title="Saved"
          asChild
        >
          <Link href="/saved">
            {/* <Bookmark /> */}
            <HugeiconsIcon icon={Crown02Icon} />
            <div className="hidden lg:flex flex-col items-start">
              <span>Upgrade Plan</span>
              <span>Get premium features</span>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  )
}
