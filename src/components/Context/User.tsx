'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookie from 'cookie-universal';

type UData = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    image_url?: string,
    address?: string,
    city?: string,
    email_verified_at?: string | null
}

type UContext = {
    user: UData | null,
    setUser: React.Dispatch<React.SetStateAction<UData | null>>
};

const UserContext = createContext<UContext | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const cookie = Cookie();
    const [user, setUser] = useState<UData | null>(null);
    
    useEffect(() => {
        const userCookie = cookie.get('data')?.user || null;
        if(userCookie){
            setUser({
                phone: userCookie.phone,
                address: userCookie.address,
                city: userCookie.city,
                email: userCookie.email,
                first_name: userCookie.first_name,
                last_name: userCookie.last_name,
                image_url: userCookie.image_url,
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UContext | null => {
    return useContext(UserContext);
}