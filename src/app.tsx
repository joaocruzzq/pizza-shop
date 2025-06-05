import "./index.css"

import { Toaster } from "sonner"

import { router } from "./routes"
import { RouterProvider } from "react-router"

import { queryClient } from "./lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"

import { Helmet, HelmetProvider } from "react-helmet-async"

import { ThemeProvider } from "./components/theme/theme-provider"

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark" >
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}