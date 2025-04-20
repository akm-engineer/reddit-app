import type { PropsWithChildren } from "react"
import { Sidebar } from "./_components/sidebar"
import { Navbar } from "./_components/navbar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="max-w-dvw mx-auto pl-12 pr-2 py-6 flex w-full grow gap-5">
        <Sidebar className="sticky h-fit hidden sm:block flex-none space-y-3 rounded-md bg-card px-6 py-4 shadow-sm xl:w-72" />
        <div className="w-full space-y-4 mx-8">
          <Navbar />
          {children}
        </div>
      </div>
      <Sidebar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
    </div>
  )
}
