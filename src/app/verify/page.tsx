import { GetUser } from '@/lib/services/auth/GetUser'
import { SendCode } from '@/lib/services/auth/SendCode';
import ShowMessage from '@/components/ShowMessage/ShowMessage';
import UpdateMessage from '@/components/UpdateMessage/UpdateMessage';
import VerifyForm from '@/components/Verify/VerifyForm';
import { UserData } from '@/types/RegsiterUser';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react'

export const metadata: Metadata = {
    title: 'Verify',
    description: 'Verification Your Email'
}

export default async function Verify() {
    const message = (await cookies()).get('message')?.value;
    const user: UserData = await GetUser();
    await SendCode();
    
    return (
        <>
            <UpdateMessage message={message} />
            <ShowMessage />
            <div className='flex flex-col items-center justify-center h-[calc(100vh-125px)] md:h-[calc(100vh-150px)]'>
                <h1 className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>Verify Code</h1>
                <p className='text-body-text text-center text-[12px] sm:text-[14px] mt-2'>We Sent Code To This Email:
                    <span className='text-dark-blue'> {user.email}</span>
                </p>
                <VerifyForm />
            </div>
        </>
    )
}
