import { Button } from "@/components/ui/button"
import { UrlField } from "../../edit/page"
import { MobileBackButton } from "../video/page"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Crown02Icon } from "@hugeicons/core-free-icons"

export default function Page() {
  return (
    <section className="w-full min-h-[76vh] h-fit flex flex-col justify-start items-start gap-4">
      <MobileBackButton />
      <div className="w-full h-full flex flex-col items-start justify-start gap-y-2">
        {[1, 2].map((_, i) => (
          <div key={i} className="flex flex-col w-full h-fit gap-y-2">
            <div className="text-[#808080] font-medium text-sm">
              Choose Audio
            </div>
            <div className="flex overflow-x-auto overflow-y-hidden gap-6">
              {[
                { id: 1, premium: false },
                { id: 2, premium: false },
                { id: 3, premium: true },
                { id: 4, premium: false },
                { id: 5, premium: false },
              ].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl w-fit h-fit flex flex-col gap-2 bg-[#1C1C1C] border border-[#474747] p-2"
                >
                  <div className="relative w-fit h-fit rounded-lg overflow-hidden">
                    <img
                      src="/media/video-effects.png"
                      alt="video effect"
                      className="aspect-video w-48 h-28 object-contain rounded-lg"
                    />
                    {_.premium && (
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                        <HugeiconsIcon
                          icon={Crown02Icon}
                          className="size-5 fill-[#FFD700] text-[#FFD700]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-white font-semibold text-sm">Sarah</div>
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full bg-[#474747] text-[#B1B1B1] px-1.5 py-0.5 flex justify-center items-center">
                      <p className="text-xxs">English</p>
                    </div>
                    <div className="rounded-full bg-[#474747] text-[#B1B1B1] px-1.5 py-0.5 flex justify-center items-center">
                      <p className="text-xxs">English</p>
                    </div>
                    <div className="rounded-full bg-[#474747] text-[#B1B1B1] px-1.5 py-0.5 flex justify-center items-center">
                      <p className="text-xxs">English</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col w-full h-fit gap-y-4">
          <div className="text-[#808080] font-medium text-sm">
            Or Enter Custom Video
          </div>
          <div className="space-y-8">
            <UrlField />
            <p className="text-sm text-[#808080]">
              By continuing, you agree to our{" "}
              <span className="underline">Terms and Conditions.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-4 items-center mt-7">
        <Button
          className="bg-[#272727] text-[#808080] flex-1 hover:bg-[#272727] border-2 rounded border-[#3B3B3B]"
          asChild
        >
          <Link href="/effects">Generate Now</Link>
        </Button>
      </div>
    </section>
  )
}
