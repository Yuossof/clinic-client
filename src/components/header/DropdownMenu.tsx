'use client'
import {
    LogOut,
    User,
    Sheet
} from "lucide-react"


import Link from "next/link";
import GetToken from "../../lib/services/auth/GetToken";
import { useToastMessage } from "../../Context/ToastMessage";
import { useUser } from "../../Context/User";
import Cookie from 'cookie-universal';
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"

interface DropdownMenuCheckboxesProps {
    AvatarCmp: React.ElementType;
}

export function DropdownMenuCheckboxes({ AvatarCmp }: DropdownMenuCheckboxesProps) {
    const cookieStore = Cookie();
    const messageContext = useToastMessage();
    const userContext = useUser();
    const router = useRouter()
    const [showBox, setShowBox] = useState<boolean>(false)

    const handleLogout = async () => {
        const token = await GetToken();
        const res = await fetch('http://localhost:8000/api/users/logout', {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (res.ok) {
            cookieStore.removeAll();
            messageContext?.setToastMessage('Logout Successfully');
            userContext?.setUser(null);
            router.push('/login');
        }
    }

    const clickOnItem = (isLogout: boolean) => {
        if (isLogout) handleLogout()
        setShowBox(false)
    }

    useEffect(() => {
        const closeDropdown = () => setShowBox(false);
        window.addEventListener("click", closeDropdown);
        return () => window.removeEventListener("click", closeDropdown);
    }, []);
    

    return (
        <>
            {(userContext?.user && userContext?.user.email_verified_at !== null) && (
                <div>
                    <button onClick={(eo) => {
                        eo.stopPropagation()
                        setShowBox(!showBox)
                    }} className="outline-none">
                        <AvatarCmp />
                    </button>
                    {showBox && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            <Link
                                onClick={() => clickOnItem(false)} href={"/profile"}
                                className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                <User size={22} />
                                <span className="text-md">Profile</span>
                            </Link>
                            <Link
                                onClick={() => clickOnItem(false)} href={"/my-appointments"}
                                className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                <User size={22} />
                                <span className="text-md">My Appointments</span>
                            </Link>
                            <Link
                                onClick={() => clickOnItem(false)} href={"/profile/reports"}
                                className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                <Sheet size={22} />
                                <span className="text-md">Reports</span>
                            </Link>
                            <div className="w-full h-[1px] bg-gray-200"></div>
                            <Link
                                onClick={() => clickOnItem(true)} href={"/profile"}
                                className="flex cursor-pointer items-center gap-3 text-red-500 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                <LogOut size={22} />
                                <span className="text-md">Logout</span>
                            </Link>
                        </motion.div>
                    )}
                </div>
            )}
        </>
    )
}
