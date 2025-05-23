import { createBrowserRouter } from "react-router";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";

import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

import { Dashboard } from "./pages/app/dashboard";
import { Orders } from "./pages/app/orders/orders";

export const router = createBrowserRouter([
   {
      path: "/",
      element : <AppLayout />,

      children: [
         { path: "/", element: <Dashboard />},
         { path: "/orders", element: <Orders />}
      ]
   },

   {
      path: "/",
      element : <AuthLayout />,

      children: [
         { path: "/sign-in", element: <SignIn />},
         { path: "/sign-up", element: <SignUp />},
      ]
   }
])