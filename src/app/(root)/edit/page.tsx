"use client"

import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Crown02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { Suspense } from "react"

export default function Page() {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <section className="w-full min-h-[76vh] h-fit flex items-center">
          <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            {/* <h1 className="text-3xl font-mono font-thin">Continue in Mobile</h1> */}
            <Link href="/video">Continue Editing</Link>
          </div>
        </section>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <section className="w-full min-h-[76vh] h-fit flex items-center">
            <div className="w-[40%] h-full flex items-start justify-center">
              <img
                src="/media/video-cover-blur.png"
                alt="Video cover"
                className="object-contain w-80 h-full rounded-xl"
              />
            </div>
            <div className="w-[60%] h-full flex flex-col items-start justify-start gap-y-2">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex flex-col w-full h-fit gap-y-2">
                  <div className="text-[#808080] font-medium">Choose Audio</div>
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

                        <div className="text-white font-semibold text-sm">
                          Sarah
                        </div>
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

              <div className="flex flex-col w-[80%] h-fit gap-y-4">
                <div className="text-[#808080] font-medium">
                  Or Enter Custom Video
                </div>
                <div className="space-y-8">
                  <UrlField />
                  <p className="text-sm text-[#808080]">
                    By continuing, you agree to our{" "}
                    <span className="underline">Terms and Conditions.</span>
                  </p>
                </div>

                <div className="w-full flex gap-2 items-center mt-7">
                  <Button
                    className="bg-[#272727] text-[#808080] flex-1 hover:bg-[#272727] border-2 rounded border-[#3B3B3B]"
                    asChild
                  >
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button className="bg-[#272727] text-[#808080] flex-1 hover:bg-[#272727] border-2 rounded border-[#3B3B3B]">
                    Generate Now
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Suspense>
      )}
    </>
  )
}

export const UrlField = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        data-slot="input"
        className={cn(
          "placeholder:text-muted-foreground placeholder:truncate selection:bg-primary selection:text-primary-foreground  flex h-9 w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "pe-[100%] p-6 ring-4 text-sm ring-[#272727] bg-[#1C1C1C]"
        )}
        placeholder="Enter your custom video URL"
      />
      <Button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 transform text-white bg-[#737373]/30 hover:bg-[#737373]/30 cursor-pointer rounded"
      >
        Fetch video
      </Button>
    </div>
  )
}
