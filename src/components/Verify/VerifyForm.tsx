'use client';
import React, { useActionState, useEffect, useState } from "react";
import VerifyAction from "../../lib/services/auth/VerifyAction";
import axios from 'axios';
import GetToken from "../../lib/services/auth/GetToken";
import { useUser } from "../../Context/User";
import Cookie from 'cookie-universal';
import { useRouter } from "next/navigation";

export default function VerifyForm() {
    const [state, action, pending] = useActionState(VerifyAction, undefined);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const userContext = useUser();
    const router = useRouter();
    const cookie = Cookie();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // will false when this condition is true 
        setDisabled(value.length !== 5);
    }

    const handleResendCode = async () => {
        const token = await GetToken();
        try {
            const res = await axios.get('http://localhost:8000/api/users/send-code', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.data;
            setMessage(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(state?.user)
        if (state?.user) {
            userContext?.setUser({
                phone: state?.user?.phone,
                address: state?.user?.address,
                city: state?.user?.city,
                email: state?.user?.email,
                first_name: state?.user?.first_name,
                last_name: state?.user?.last_name,
                image_url: state?.user?.image_url,
                email_verified_at: state?.user?.email_verified_at
            })
            router.push('/');
        }
    }, [state?.user])

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [message])

    return (
        <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">
            {message &&
                <div className="bg-green-300 text-white w-full rounded-md p-2 text-center">
                    <span>{message}</span>
                </div>
            }
            <div>
                <input className="w-full border border-form rounded-lg text-body-text focus:outline-none focus:ring-0" onChange={handleChange} defaultValue={state?.data?.code} name="code" type="text" placeholder="Type Your Code" />
                {state?.errors?.code && <span className="text-red-600">{state.errors.code[0]}</span>}
            </div>
            <button type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled || pending}>
                {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Continue'}
            </button>
            <span>Didn’t receive the email? <strong className='cursor-pointer text-dark-blue' onClick={handleResendCode}>Click to resend</strong></span>
        </form>
    )
}
