'use client'
import {
    LogOut,
    User,
    Sheet
} from "lucide-react"
import { FaUserClock } from "react-icons/fa6";
import Link from "next/link";
import GetToken from "../../lib/services/auth/GetToken";
import { useToastMessage } from "../../Context/ToastMessage";
import { useUser } from "../../Context/User";
import Cookie from 'cookie-universal';
import { useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import Image from "next/image";
import { useRegetImage } from "@/store/useRegetImage";
export function DropdownMenuCheckboxes() {
    const { reget } = useRegetImage()
    const cookieStore = Cookie();
    const messageContext = useToastMessage();
const userContext = useUser();
    const router = useRouter()
    const [showBox, setShowBox] = useState<boolean>(false)

    const handleLogout = async () => {
        const token = await GetToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`, {
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
            {(userContext?.user && userContext?.user?.email_verified_at) && (
                <div className="flex items-center gap-6">
                    <div className="relative z-50">
                        <button onClick={(eo) => {
                            eo.stopPropagation()
                            setShowBox(!showBox)
                        }} className="outline-none">
                            <Image
                                src={reget || userContext?.user?.image_url || ''}
                                alt="Your Image"
                                width={40}
                                height={40}
                                className="rounded-full object-center w-[40px] h-[40px] "
                            />
                        </button>
                        {showBox && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="bg-slate-50 absolute top-14 rounded-md shadow-lg border-[1px] border-gray-200 -left-44  p-4 flex flex-col gap-2 w-[250px]"
                            >
                                {userContext?.user?.role == 'user' ? (
                                    <Link
                                        onClick={() => clickOnItem(false)} href={"/profile"}
                                        className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                        <User size={22} />
                                        <span className="text-md">Profile</span>
                                    </Link>
                                ) : (
                                    <Link
                                        onClick={() => clickOnItem(false)} href={userContext?.user?.role === 'admin' ? '/admin' : '/doctor-dashboard'}
                                        className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                        <MdSpaceDashboard size={22} />
                                        <span className="text-md">My Dashboard</span>
                                    </Link>
                                )}
                                <Link
                                    onClick={() => clickOnItem(false)} href={"/my-appointments"}
                                    className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                    <FaUserClock size={22} />
                                    <span className="text-md">My Appointments</span>
                                </Link>
                                <Link
                                    onClick={() => clickOnItem(false)} href={"/profile/reports"}
                                    className="flex items-center gap-3 text-gray-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                    <Sheet size={22} />
                                    <span className="text-md">Reports</span>
                                </Link>
                                <div className="w-full h-[1px] bg-gray-200"></div>
                                <button
                                    onClick={() => clickOnItem(true)}
                                    className="flex cursor-pointer items-center gap-3 text-red-500 px-3 py-2 rounded-md hover:bg-slate-100 transition-all">
                                    <LogOut size={22} />
                                    <span className="text-md">Logout</span>
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
