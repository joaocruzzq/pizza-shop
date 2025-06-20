import { Helmet } from "react-helmet-async"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"

import { z } from "zod"

import { toast } from "sonner"

import { Link, useNavigate } from "react-router"

import { useMutation } from "@tanstack/react-query"
import { registerRestaurant } from "@/api/register-restaurant"

const signUpForm = z.object({
   phone: z.string(),
   managerName: z.string(),
   email: z.string().email(),
   restaurantName: z.string()
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
   const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

   const { mutateAsync: registerRestaurantFn } = useMutation({
      mutationFn: registerRestaurant
   })

   const navigate = useNavigate()

   async function handleSignIn(data: SignUpForm) {
      try {
         await registerRestaurantFn({
            restaurantName: data.restaurantName,
            managerName : data.managerName,
            email : data.email,
            phone : data.phone
         })

         toast.success("Restaurante cadastrado com sucesso!", {
            action: {
               label: "Login",
               onClick: () => navigate(`/sign-in?email=${data.email}`)
            }
         })
      }

      catch {
         toast.error("Erro ao cadastrar restaurante.")
      }
   }

   return (
      <>
         <Helmet title="Cadastro" />

         <div className="p-8">
            <Button asChild variant={"ghost"} className="absolute right-8 top-8">
               <Link to="/sign-in" className="">
                  Fazer login
               </Link>
            </Button>

            <div className="w-[320px] flex flex-col justify-center gap-6">
               <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Criar conta grátis
                  </h1>

                  <p className="text-sm text-muted-foreground">
                     Seja um parceiro e comece suas vendas!
                  </p>
               </div>

               <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                     <Input id="restaurantName" type="text" {...register("restaurantName")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="managerName">Seu nome</Label>
                     <Input id="managerName" type="text" {...register("managerName")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="email">Seu e-mail</Label>
                     <Input id="email" type="email" {...register("email")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="phone">Seu celular</Label>
                     <Input id="phone" type="tel" {...register("phone")} />
                  </div>

                  <Button disabled={isSubmitting} type="submit" className="w-full">
                     Finalizar cadastro
                  </Button>

                  <p className="px-5 text-center text-sm leading-relaxed text-muted-foreground">
                     Ao continuar, você concorda com nossos {" "}
                     <a href="" className="underline underline-offset-4">termos de serviço</a> e {" "}
                     <a href="" className="underline underline-offset-4">políticas de privacidade</a>.
                  </p>
               </form>
            </div>
         </div>
      </>
   )
}