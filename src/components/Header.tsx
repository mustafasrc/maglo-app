"use client";

import { Search, Notification } from "@/components/icons";
import { FaCaretDown } from "react-icons/fa";
import { selectUser, useAuthStore } from "@/store/auth";
import { IoIosMenu } from "react-icons/io";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const user = useAuthStore(selectUser);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Menu"
                    >
                        <IoIosMenu className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">
                        Dashboard
                    </h1>
                </div>

                <div className="flex gap-2 sm:gap-4 lg:gap-10 items-center flex-shrink-0">
                    <button
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#929EAE]" />
                    </button>

                    <button
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Notifications"
                    >
                        <Notification className="w-5 h-5 sm:w-6 sm:h-6 text-[#929EAE]" />
                    </button>

                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FAFAFA] rounded-xl hover:bg-gray-200 transition-colors">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img
                                src="/user.png"
                                className="rounded-full w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
                                alt="User avatar"
                            />
                            {/* Name - Hide on small screens */}
                            <span className="hidden sm:inline font-semibold text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                                {user?.fullName}
                            </span>
                        </div>
                        <button
                            className="ml-1 sm:ml-3"
                            aria-label="User menu"
                        >
                            <FaCaretDown className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}