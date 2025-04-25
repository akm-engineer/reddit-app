import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { PropsWithChildren } from "react"

export const PremiumDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 lg:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Buy Premium PRO</DialogTitle>
        </DialogHeader>

        <div className="w-full bg-[#101010] flex flex-col sm:flex-row ">
          <div className="px-3 py-6 flex-1 bg-[#652CD3]/10 text-white flex flex-col gap-y-2 justify-center items-center">
            <h1 className="font-semibold text-xl">Premium PRO</h1>
            <h2 className="font-bold tracking-tight text-5xl">$329</h2>
            <p className="font-normal text-base">billed just once</p>
            <Button className="bg-[#805AD5] h-12 text-white hover:bg-[#805AD5] w-[90%]">
              Buy Now
            </Button>
          </div>
          <div className="p-6 flex-1/3 space-y-4">
            <h3>
              Access these features when you get this pricing package for your
              business.
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="text-black"
                  fill="#652CD3"
                />
                International calling and messaging API
              </li>

              <li className="flex gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="text-black"
                  fill="#652CD3"
                />
                International calling and messaging API
              </li>

              <li className="flex gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="text-black"
                  fill="#652CD3"
                />
                International calling and messaging API
              </li>

              <li className="flex gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="text-black"
                  fill="#652CD3"
                />
                International calling and messaging API
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
