import { api } from "@/lib/axios";

export interface GetOrdersQuery {
   pageIndex?: number | null
}

export interface GetOrdersResponse {
   orders: {
      total: number
      orderId: string
      createdAt: string
      customerName: string
      status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
    }[];

    meta: {
       perPage: number
       pageIndex: number
       totalCount: number
    };
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
   const response = await api.get<GetOrdersResponse>("/orders", {
      params: {
         pageIndex
      }
   })

   return response.data
}