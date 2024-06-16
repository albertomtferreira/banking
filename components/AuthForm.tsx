"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)

  // 1. Define Form
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a Submit Handler
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values)

  }

  return (
    <section className='auth-from'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='flex cursor-pointer items-center gap-1'>
          <Image src="./icons/logo.svg" width={34} height={34} alt="Horizon Logo" />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user
              ? "Link Account"
              : type === "sign-in"
                ? "Sign-in"
                : "Sign-up"
            }
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? "Link your account to get started"
                : "PLease enter your details"
              }
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          {/* TODO - Plaid Link */}

        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className='form-item'>
                    <FormLabel className='form-label'>
                      Email address
                    </FormLabel>
                    <div className='flex flex-col w-full'>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
                          className='input-class'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage
                        className='form-message mt-2'
                      />
                    </div>
                  </div>
                )}
              /> */}
              {/* Control add new inputs by adding them to authFormSchema */}
              <CustomInput
                control={form.control} name="email" label="Email address" placeholder="Enter your email" type="text"
              />
              <CustomInput
                control={form.control} name="password" label="Password" placeholder="Enter your password" type="password"
              />
              <CustomInput
                control={form.control} name="username" label="Username" placeholder="Enter your username" type="text"
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default AuthForm

