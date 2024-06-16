"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { date, set, z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

  // 1. Define Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a Submit Handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      // TODO - sign up with Appwrite & create plaid link token
      if (type === "sign-up") {
        // TODO - create signUp function
        // const newUser = await signUp(values)
        // setUser(newUser)
      } else if (type === "sign-in") {
        // TODO - create signIn function
        // const response = await signIn({
        //   email: values.email,
        //   password: values.password,
        // })
        // if (response) router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

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
                ? "Sign In"
                : "Sign Up"
            }
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? "Link your account to get started"
                : "Please enter your details"
              }
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          {/* TODO - Plaid Link */}
          Plaid Link

        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {
                type === "sign-up" && (
                  <>
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" type="text" />
                      <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" type="text" />
                    </div>
                    <CustomInput control={form.control} name="address" label="Address" placeholder="Enter your specific address" type="text" />
                    <CustomInput control={form.control} name="city" label="City" placeholder="ex: London" type="text" />
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name="county" label="County" placeholder="ex: Greater London" type="text" />
                      <CustomInput control={form.control} name="postCode" label="Post Code" placeholder="ex: N1 2HA" type="text" />
                    </div>
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" type="text" />
                      <CustomInput control={form.control} name="nin" label="NIN" placeholder="ex: XX123456Z" type="text" />
                    </div>
                  </>
                )
              }
              <>
                <CustomInput control={form.control} name="email" label="Email address" placeholder="Enter your email" type="text" />
                <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" />
              </>
              <div className='flex flex-col gap-4'>
                <Button type="submit" className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' />
                      &nbsp; Submitting...
                    </>
                  ) : type === "sign-in"
                    ? "Sign in" : "Sign up"
                  }
                </Button>
              </div>

            </form>
          </Form>
          <footer className='flex justify-center gap-2 py-2'>
            <p className='text-14 font-normal text-gray-600'>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className='form-link'>
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm

