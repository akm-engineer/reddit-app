import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Clock04Icon,
  Crown02Icon,
  Home07Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export const BottomBar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-[#1c1c1c] ", className)}>
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

      <Button
        variant={"ghost"}
        className="flex items-center justify-start gap-3 mt-auto"
        title="Saved"
        asChild
      >
        <Link href="/saved">
          <HugeiconsIcon icon={Crown02Icon} />
          <div className="hidden lg:flex flex-col items-start">
            <span>Upgrade Plan</span>
            <span>Get premium features</span>
          </div>
        </Link>
      </Button>
    </div>
  )
}
