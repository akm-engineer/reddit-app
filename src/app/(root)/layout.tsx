import type { PropsWithChildren } from "react"
import { BottomBar } from "./_components/bottom-bar"
import { Navbar } from "./_components/navbar"
import { AppSidebar } from "./_components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full h-full flex-col">
      <SidebarProvider>
        <div className="max-w-dvw mx-auto p-4 sm:pl-12 sm:pr-2 sm:py-6 flex w-full grow gap-5">
          <AppSidebar />
          <main className="w-full space-y-4 mx-0 sm:mx-4 lg:mx-8">
            <Navbar />
            {children}
          </main>
        </div>
      </SidebarProvider>
      <BottomBar className="sticky bottom-0 flex w-full justify-center gap-8 border-t p-3 sm:hidden" />
    </div>
  )
}
