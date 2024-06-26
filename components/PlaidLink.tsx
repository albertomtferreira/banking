"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOptions, PlaidLinkOnSuccess, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { crateLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';
import Link from 'next/link';

export const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await crateLinkToken(user)
      setToken(data?.linkToken)
    }
    getLinkToken()

  }, [user])

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })
    router.push("/")
  }, [user])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config)

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className='plaidlink-primary'
        >
          Connect bank
        </Button>
      ) :
        variant === "ghost" ? (
          <Button
            onClick={() => open()}
            variant="ghost"
            className='plaidlink-ghost'
          >
            <Image
              src="/icons/connect-bank.svg"
              alt='Connect Bank'
              width={24}
              height={24}
            />
            <p className='hidden text-[16px] font-semibold text-black-2 max-xl:hidden'>Connect bank</p>
          </Button>
        ) : (
          <Button
            onClick={() => open()}
            className='plaidlink-default'
          >
            <Image
              src="/icons/connect-bank.svg"
              alt='Connect Bank'
              width={24}
              height={24}
            />
            <p className='text-[16px] font-semibold text-black-2 max-xl:hidden'>Connect bank</p>

          </Button>
        )
      }
    </>
  )
}

export const PlaidLinkRightSidebar = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await crateLinkToken(user)
      setToken(data?.linkToken)
    }
    getLinkToken()

  }, [user])

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })
    router.push("/")
  }, [user])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config)

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className='plaidlink-primary '
        >
          Add Bank
        </Button>
      ) :
        variant === "ghost" ? (
          <Button
            onClick={() => open()}
            variant="ghost"
            className='plaidlink-ghost'
          >
            <Image
              src="/icons/connect-bank.svg"
              alt='Connect Bank'
              width={24}
              height={24}
            />
            <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>Add Bank</p>
          </Button>
        ) : (
          <Button
            onClick={() => open()}
            className='plaidlink-default'
          >
            <Image
              src="/icons/connect-bank.svg"
              alt='Connect Bank'
              width={24}
              height={24}
            />
            <p className='text-14 font-semibold text-gray-600 xl:block'>Add Bank</p>

          </Button>
        )
      }
    </>
  )
}