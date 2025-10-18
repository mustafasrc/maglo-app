"use client";
import { useState } from 'react';
import { Dashboard, Transactions, Invoices, Wallets, Settings, Logout, Help } from "@/components/icons";
import { MdClose } from "react-icons/md";
import { useAuthStore } from '@/store/auth';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from 'next/image';
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}


interface MenuItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}


export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [pathname] = useState<string>('/');

    const { logout } = useAuthStore()
    const router = useRouter()

    const menu: MenuItem[] = [
        { name: 'Dashboard', href: '/', icon: Dashboard },
        { name: 'Transactions', href: '/transactions', icon: Transactions },
        { name: 'Invoices', href: '/invoices', icon: Invoices },
        { name: 'My Wallets', href: '/wallets', icon: Wallets },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const handleLogout = (): void => {
        try {
            logout()
            toast.success("Logged out successfully")
            router.push("/login")
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`Logout failed: ${err.message}`);
            } else {
                toast.error("Logout failed, please try again later");
            }
        }

    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                    fixed lg:sticky top-0 h-screen
                    w-64  bg-[#FAFAFA] p-5 z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                <div className="flex flex-col h-full gap-y-10">
                    <div className="space-y-16">
                        {/* Logo and Close Button */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-2 items-center">
                                <div className="relative w-8 h-8 ">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <h1 className="font-bold text-2xl">Maglo.</h1>
                            </div>
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <MdClose className='w-6 h-6' />
                            </button>
                        </div>

                        <ul className="space-y-1">
                            {menu.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <li key={item.name}>
                                        <button
                                            className={`
                                            w-full p-3 rounded-xl flex items-center gap-x-3 font-medium
                                            transition-all duration-200 cursor-pointer
                                            ${isActive
                                                    ? "bg-[#C8EE44] text-black font-bold"
                                                    : "text-[#929EAE] hover:bg-[#E8F5B8] hover:text-black"
                                                }
                                          `}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.name}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <ul className="mt-auto mb-24 space-y-1">
                        <li>
                            <button className="w-full p-3 rounded-xl flex gap-x-3 text-[#929EAE] hover:bg-[#E8F5B8] hover:text-black transition-all duration-200 cursor-pointer">
                                <Help className="w-5 h-5" />
                                Help
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full p-3 rounded-xl flex gap-x-3 text-[#929EAE] hover:bg-[#E8F5B8] hover:text-black transition-all duration-200 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <Logout className="w-5 h-5" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}