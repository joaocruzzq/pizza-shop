import {
   DialogTitle,
   DialogFooter,
   DialogHeader,
   DialogContent,
   DialogDescription,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { useQuery } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const storeProfileSchema = z.object({
   name: z.string().min(1),
   description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
   const { data: managedRestaurant } = useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant
   })

   console.log("managedRestaurant", managedRestaurant)


   const { register, handleSubmit } = useForm<StoreProfileSchema>({
      resolver: zodResolver(storeProfileSchema),
      values: {
         name: managedRestaurant?.name ?? "",
         description: managedRestaurant?.description ?? ""
      }
   })

   return (
      <DialogContent>
         <DialogHeader>
            <DialogTitle>
               Perfil da loja
            </DialogTitle>

            <DialogDescription>
               Atualize as infromações do seu estabelecimento visíveis ao seu cliente
            </DialogDescription>
         </DialogHeader>

         <form action="">
            <div className="space-y-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="justify-end" htmlFor="name">
                     Nome
                  </Label>

                  <Input className="col-span-3" id="name" {...register("name")} />
               </div>
            </div>

            <div className="space-y-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="justify-end" htmlFor="description">
                     Descrição
                  </Label>

                  <Textarea className="col-span-3" id="description" {...register("description")} />
               </div>
            </div>

            <DialogFooter>
               <Button type="button" variant={"ghost"}>
                  Cancelar
               </Button>

               <Button type="submit" variant={"success"}>
                  Salvar
               </Button>
            </DialogFooter>
         </form>
      </DialogContent>
   )
}