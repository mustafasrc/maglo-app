import { BsThreeDots } from "react-icons/bs";
import { Card, Wifi } from "@/components/icons";
import { Wallet } from "@/types";

interface WalletCardProps {
    wallets: Wallet[];
    isLoading: boolean;
}

export default function WalletCard({ wallets, isLoading }: WalletCardProps) {

    const universalCard: Wallet = wallets[0]
    const commercialCard: Wallet = wallets[1]
    const [universalCardName, universalCardBank] = universalCard?.bank ? universalCard.bank.split(" | ") : ["", ""];
    const [commercialCardName, commercialCardBank] = commercialCard?.bank ? commercialCard.bank.split(" | ") : ["", ""];


    return (
        <div className="mb-52 space-y-4">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Wallet</h2>
                <button className="text-[#929EAE]">
                    <BsThreeDots className="text-xl" />
                </button>
            </div>

            {isLoading ? (
                <div className="relative">
                    {/* Universal Card Skeleton */}
                    <div className="bg-gradient-to-b from-[#4A4A49] to-[#20201F] rounded-2xl p-5 space-y-6 animate-pulse">
                        <div className="flex items-center gap-3">
                            <div className="h-5 bg-gray-600 rounded w-32"></div>
                            <span className="w-[1px] h-5 bg-[#626261]"></span>
                            <div className="h-4 bg-gray-600 rounded w-24"></div>
                        </div>
                        <div>
                            <div className="w-[37px] h-[30px] bg-gray-600 rounded"></div>
                        </div>
                        <div>
                            <div className="h-5 bg-gray-600 rounded w-48"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="w-12 h-8 bg-gray-600 rounded"></div>
                        </div>
                    </div>

                    {/* Commercial Card Skeleton */}
                    <div className="bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.4)] rounded-2xl p-5 space-y-10 inline-block w-[95%] mx-auto absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[65%] backdrop-blur-[10px] border border-gray-200/40 shadow-sm animate-pulse">
                        <div className="flex items-center gap-3">
                            <div className="h-5 bg-gray-300 rounded w-32"></div>
                            <span className="w-[1px] h-5 bg-gray-300"></span>
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[37px] h-[30px] bg-gray-300 rounded"></div>
                            <div className="w-[37px] h-[30px] bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="space-y-2">
                                <div className="h-5 bg-gray-300 rounded w-48"></div>
                                <div className="h-4 bg-gray-300 rounded w-20"></div>
                            </div>
                            <div className="w-10 h-8 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    {/* Universal Card */}
                    <div className="bg-gradient-to-b from-[#4A4A49] to-[#20201F] rounded-2xl p-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-white">{universalCardName}</h2>
                            <span className="w-[1px] h-5 bg-[#626261]"></span>
                            <span className="text-[#626260] font-medium text-xs">{universalCardBank}</span>
                        </div>
                        <div>
                            <Card className="w-[37px] h-[30px]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white tracking-widest">{universalCard?.cardNumber}</h3>
                        </div>
                        <div className="flex justify-end">
                            {universalCard?.network === 'Visa' ?
                                <img src="/icons-svg/visa.svg" className="w-15" alt="Visa" /> :
                                <img src="/icons-svg/mastercard.svg" className="w-15" alt="Mastercard" />}
                        </div>
                    </div>

                    {/* Commercial Card */}
                    <div className="bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.4)] rounded-2xl p-5 space-y-10 inline-block w-[95%] mx-auto absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[65%] backdrop-blur-[10px] border border-gray-200/40 shadow-sm">
                        <div className="flex items-center gap-3 text-white">
                            <h2 className="text-lg font-bold">{commercialCardName}.</h2>
                            <span className="w-[1px] h-5 bg-white"></span>
                            <span className="font-medium text-xs">{commercialCardBank}</span>
                        </div>
                        <div className="flex justify-between">
                            <Card className="w-[37px] h-[30px]" />
                            <Wifi className="w-[37px] h-[30px]" />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="font-bold text-lg text-[#1B212D] tracking-widest">{commercialCard?.cardNumber}</h3>
                                <p className="font-medium text-[#929EAE] text-sm">{commercialCard?.expiryMonth}/{commercialCard?.expiryYear}</p>
                            </div>
                            {commercialCard?.network === 'Visa' ?
                                <img src="/icons-svg/visa.svg" className="w-10" alt="Visa" /> :
                                <img src="/icons-svg/mastercard.svg" className="w-10" alt="Mastercard" />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}