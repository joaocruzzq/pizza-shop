import {
   DialogClose,
   DialogTitle,
   DialogHeader,
   DialogFooter,
   DialogContent,
   DialogDescription,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { updateProfile } from "@/api/update-profile";

import { toast } from "sonner";

const storeProfileSchema = z.object({
   name: z.string().min(1),
   description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
   const queryClient = useQueryClient()

   const { data: managedRestaurant } = useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
      staleTime: Infinity
   })

   console.log("managedRestaurant", managedRestaurant)

   const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
      resolver: zodResolver(storeProfileSchema),
      values: {
         name: managedRestaurant?.name ?? "",
         description: managedRestaurant?.description ?? ""
      }
   })

   const { mutateAsync: updateProfileFn } = useMutation({
      mutationFn: updateProfile,
      onSuccess(_, { name, description }) {
         const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(["managed-restaurant"])

         if (cached) {
            queryClient.setQueryData<GetManagedRestaurantResponse>(["managed-restaurant"], {
               ...cached,
               name,
               description
            })
         }

         else {

         }
      },
   })

   async function handleUpdateProfile(data: StoreProfileSchema) {
      try {
         await updateProfileFn({
            name: data.name,
            description: data.description
         })

         toast.success("Perfil atualizado com sucesso!")
      }

      catch {
         toast.error("Falha ao atualizar perfil, tente novamente.")
      }
   }

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

         <form action="" onSubmit={handleSubmit(handleUpdateProfile)}>
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
               <DialogClose>
                  <Button type="button" variant={"ghost"}>
                     Cancelar
                  </Button>
               </DialogClose>

               <Button type="submit" variant={"success"} disabled={isSubmitting} >
                  Salvar
               </Button>
            </DialogFooter>
         </form>
      </DialogContent>
   )
}