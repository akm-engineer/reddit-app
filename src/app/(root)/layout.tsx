import type { PropsWithChildren } from "react"
import { Sidebar } from "./_components/sidebar"
import { Navbar } from "./_components/navbar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen h-full flex-col">
      <div className="max-w-dvw mx-auto p-4 sm:pl-12 sm:pr-2 sm:py-6 flex w-full grow gap-5">
        <Sidebar className="sticky hidden sm:block flex-none space-y-3 rounded-md px-6 py-4 shadow-sm xl:w-72" />
        <div className="w-full space-y-4 mx-0 sm:mx-4 lg:mx-8">
          <Navbar />
          <div className="mx-0 sm:mx-2">{children}</div>
        </div>
      </div>
      <Sidebar className="sticky bottom-0 flex w-full justify-center gap-8 border-t p-3 sm:hidden" />
    </div>
  )
}
