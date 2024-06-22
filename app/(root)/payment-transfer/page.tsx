import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.action'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Transfer = async () => {
  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })
  if (!accounts) return
  const accountsData = accounts?.data

  return (
    <section className='payment-transfer'>
      <div>
        <HeaderBox
          title="Payment Transfer"
          subtext='Provide any specific details or notes to the payment transfer'
        />
      </div>
      <section className='size-full pt-5'>
        <PaymentTransferForm
          accounts={accountsData}
        />
      </section>
    </section>
  )
}

export default Transfer