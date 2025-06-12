import { Search, ArrowRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/components/order-status";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { OrderDetails } from "./order-details";

import { ptBR } from "date-fns/locale"
import { formatDistanceToNow } from "date-fns"

export interface OrderTableRowProps {
   order: {
      total: number
      orderId: string
      createdAt: string
      customerName: string
      status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
   }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
   return (
      <TableRow>
         <TableCell>
            <Dialog>
               <DialogTrigger asChild>
                  <Button variant={"outline"} size={"xs"}>
                     <Search className="max-h-3 max-w-3" />
                     <span className="sr-only">Detalhes do pedido</span>
                  </Button>
               </DialogTrigger>

               <OrderDetails />
            </Dialog>
         </TableCell>

         <TableCell className="font-mono text-xs font-medium">
            {order.orderId}
         </TableCell>

         <TableCell className="text-muted-foreground">
            {formatDistanceToNow(order.createdAt, {
               locale: ptBR,
               addSuffix: true
            })}
         </TableCell>

         <TableCell>
            <OrderStatus status={order.status} />
         </TableCell>

         <TableCell className="font-medium">
            {order.customerName}
         </TableCell>

         <TableCell className="font-medium">
            {order.total.toLocaleString("pt-BR", {
               style: "currency",
               currency: "BRL"
            })}
         </TableCell>

         <TableCell>
            <Button variant={"outline"} size={"xs"}>
               <ArrowRight className="h-3 w-3" />
               Aprovar
            </Button>
         </TableCell>

         <TableCell>
            <Button variant={"ghost"} size={"xs"}>
               <X className="h-3 w-3" />
               Cancelar
            </Button>
         </TableCell>
      </TableRow>
   )
}