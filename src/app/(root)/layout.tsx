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
          <main className="w-full h-full space-y-4">
            <Navbar />
            {children}
          </main>
        </div>
      </SidebarProvider>
      <BottomBar />
    </div>
  )
}
