import ForgetPasswordForm from '@/components/ForgetPassword/ForgetPasswordForm';
import { SearchParams } from '@/types/SearchParams';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Forget Password',
    description: 'Forget Password'
}

export default async function ForgetPassword({ searchParams }: SearchParams) {
    const email = searchParams?.email || '';
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-125px)] md:h-[calc(100vh-150px)]'>
        <h1 className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>Forget Password</h1>
        <ForgetPasswordForm  email={email}/>
    </div>
  )
}
