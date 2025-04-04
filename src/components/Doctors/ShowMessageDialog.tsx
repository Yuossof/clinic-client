'use client';

import { useEffect, useState } from "react";
import { useMessage } from "@/Context/AlertMessage";

export default function ShowMessageDialog() {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const messageContext = useMessage();
    
    useEffect(() => {
        if (messageContext?.message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                messageContext.setMessage(null);
            }, 3000);

            return () => clearTimeout(timer); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageContext?.message]);

    useEffect(() => {
        if(messageContext?.message){
            setShowMessage(false);
            messageContext.setMessage(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={` ${showMessage ? 'top-[140px] opacity-100' : 'top-[-100%] opacity-0'} 
        ${ messageContext?.message === 'Created Successfully' ? 'bg-mid-blue' : 'bg-red-500' } absolute left-1/2 transform -translate-x-1/2 px-10 py-2 rounded-md  z-[100] text-white transition-all duration-300 ease-in-out`}>
            {messageContext?.message}
        </div>
    );
}
