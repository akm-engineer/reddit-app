"use client"

export default function Page() {
  return (
    <section className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
      <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
        <h1 className="text-3xl font-bold text-center">Login </h1>
        <div className="space-y-5">
          <LoginForm />
          <Link href="/signup" className="block text-center hover:underline">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </div>
      <img
        src="/login-image.jpg"
        alt="Login"
        className="hidden w-1/2 object-cover md:block"
      />
    </section>
  )
}

import { LoadingButton } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { login, signUp } from "@/server/actions/authActions"
import { loginSchema, type LoginValues } from "@/server/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

export const LoginForm = ({
  isLoginForm = true,
}: {
  isLoginForm?: boolean
}) => {
  const [error, setError] = useState<string>()

  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginValues) => {
    setError(undefined)
    startTransition(async () => {
      const res = isLoginForm
        ? await login({ input: values })
        : await signUp({ input: values })
      console.log(res)
      if (error) {
        setError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error ? <p className="text-center text-destructive">{error}</p> : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          Login
        </LoadingButton>
      </form>
    </Form>
  )
}
