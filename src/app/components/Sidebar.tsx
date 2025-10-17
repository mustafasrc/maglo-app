"use client";
import { usePathname } from "next/navigation";
import { Dashboard, Transactions, Invoices, Wallets, Settings, Logout, Help } from "../components/icons";


import { useAuthStore } from "../store/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
    const pathname = usePathname();

    const { logout } = useAuthStore()
    const router = useRouter()

    const menu = [
        { name: 'Dashboard', href: '/', icon: Dashboard },
        { name: 'Transactions', href: '/transactions', icon: Transactions },
        { name: 'Invoices', href: '/invoices', icon: Invoices },
        { name: 'My Wallets', href: '/wallets', icon: Wallets },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        try {
            logout()
            toast.success("Logged out successfully")
            router.push("/login")
        } catch (err) {
            toast.error("Logout failed, please try again later")
        }
    }

    return (
        <aside className="w-64 bg-[#FAFAFA] p-4">
            <div className="flex flex-col h-full gap-y-10">
                <div className="space-y-16">
                    <div className="flex gap-x-2 items-center">
                        <img src="/logo.png" alt="" />
                        <h1 className="font-bold text-2xl">Maglo.</h1>
                    </div>

                    <ul>
                        {menu.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.name} className={`p-3 rounded-xl ${isActive ? "bg-[#C8EE44]" : ""}`}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-x-3 font-medium ${isActive ? "text-black font-bold" : "text-[#929EAE]"}`}
                                    >
                                        <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-[#929EAE]"}`} />
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <ul className="mt-auto mb-24">
                    <li className="p-3">
                        <button className="flex gap-x-3 text-[#929EAE] cursor-pointer" onClick={handleLogout}>
                            <Logout className="w-5 h-5" />
                            Logout
                        </button>
                    </li>
                    <li className="p-3 flex gap-x-3 text-[#929EAE]">
                        <Help className="w-5 h-5" />
                        Help
                    </li>
                </ul>
            </div>
        </aside>
    );
}
