"use client"
import { Button } from "@/components/ui/button"
import { TriangleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Page() {
  return (
    <section className="w-full min-h-[76vh] h-fit flex flex-col justify-start items-start gap-4">
      <MobileBackButton />
      <div className="w-full h-full flex items-start justify-center">
        <img
          src="/media/video-cover-blur.png"
          alt="Video cover"
          className="object-contain w-80 h-full rounded-xl"
        />
      </div>

      <div className="w-full flex gap-4 items-center mt-7">
        <Button
          className="bg-[#272727] text-[#808080] flex-1 hover:bg-[#272727] border-2 rounded border-[#3B3B3B]"
          asChild
        >
          <Link href="/">Back to Home</Link>
        </Button>
        <Button
          className="bg-[#272727] text-[#808080] flex-1 hover:bg-[#272727] border-2 rounded border-[#3B3B3B]"
          asChild
        >
          <Link href="/effects">Customize</Link>
        </Button>
      </div>
    </section>
  )
}

export const MobileBackButton = () => {
  const router = useRouter()

  return (
    <div
      className="flex gap-2 items-center w-fit"
      onClick={() => router.back()}
    >
      <div className="p-2.5 flex justify-center items-center bg-[#252525] rounded-full">
        <HugeiconsIcon
          icon={TriangleIcon}
          className="-rotate-90 size-2.5 text-white fill-white"
        />
      </div>
      <span className="font-medium text-white text-sm">Back</span>
    </div>
  )
}
