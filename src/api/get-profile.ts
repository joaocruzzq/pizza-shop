import { api } from "@/lib/axios";

interface GetProfileResponse {
   id: string
   name: string
   email: string
   phone: string | null
   createdAt: Date | null
   updatedAt: Date | null
   role: "manager" | "customer"
}

export async function getProfile() {
   const response = await api.get("/me")

   return response.data as GetProfileResponse
}