"use client";

import { Search, Notification } from "@/components/icons";
import { FaCaretDown } from "react-icons/fa";
import { selectUser, useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Header() {
    const user = useAuthStore(selectUser)
  


    return (
        <div >
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                </div>
                <div className="flex gap-x-12 items-center">
                    <button className="cursor-pointer">
                        <Search className="w-6 h-6 text-[#929EAE]" />
                    </button>
                    <button className="cursor-pointer">
                        <Notification className="w-6 h-6 text-[#929EAE]" />
                    </button>
                    <div className="flex justify-between p-3 bg-[#FAFAFA] rounded-xl">
                        <div className="flex gap-x-3">
                            <img src="/user.png" className="rounded-full w-6 h-6" alt="" />
                            <span className="font-semibold"> {user?.fullName} </span>
                        </div>
                        <button className="ml-5">
                            <FaCaretDown />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}