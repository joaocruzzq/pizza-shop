import "./index.css"

import { RouterProvider } from "react-router"
import { router } from "./routes"

import { Helmet, HelmetProvider } from "react-helmet-async"

import { Toaster } from "sonner"

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Toaster richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}