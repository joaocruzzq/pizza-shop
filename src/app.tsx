import "./index.css"

import { RouterProvider } from "react-router"
import { router } from "./routes"

import { Helmet, HelmetProvider } from "react-helmet-async"

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}