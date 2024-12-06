"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import * as z from "zod";
import CardWrapper from "../layout/auth/CardWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  //const handleClick = () => setShow(!show);
  //const t = useTranslations("signin.form");
  const formSchema = z.object({
    email: z.string().email({
      message: "Email errado",
    }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const result = await signIn("credentials-cognito", {
        email: data.email,
        password: data.password,
        callbackUrl: `/organization`,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Erro no login, Usuário ou senha incorretos.",
        });
      } else {
        router.push(`/organization`);
      }
    } catch (e) {
      toast({
        title: "Erro no login, ocorreu um erro inesperado. Tente novamente.",
      });
    }
  }

  return (
    <CardWrapper
      title={"Titulo"}
      subtitle={"subtitle"}
      span={"Span"}
      height="full"
      hreflinktext={"href link"}
      hreflink="/signup"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-5 3xl:gap-14 flex flex-col items-center text-white lg:w-[350px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={"Email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder={"Senha"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center w-full justify-start hover:text-red-700">
            <Link href="/reset-password" className="text-xs">
              Esqueceu senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 h-14 rounded-3xl"
          >
            Entrar
          </Button>
        </form>
        <div className="w-full flex flex-col items-center justify-center gap-5 mt-5">
          <p>Novo usuario?</p>
          <Button
            onClick={() => router.push("signup")}
            className="w-full bg-red-900 hover:bg-red-800 h-14 rounded-3xl"
          >
            Criar conta
          </Button>
        </div>
      </Form>
      <Toaster />
    </CardWrapper>
  );
}
