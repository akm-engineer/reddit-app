"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"
import { Toaster } from "./ui/sonner"

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />

        <Toaster />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
