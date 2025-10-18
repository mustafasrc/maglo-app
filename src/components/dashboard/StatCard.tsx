import { formatCurrency } from "@/utils/currency";
import { FinancialItem } from "@/types";

export default function StatCard({
    icon: Icon,
    label,
    data,
    isFeatured = false,
    isLoading = false,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    data: FinancialItem | undefined;
    isFeatured?: boolean;
    isLoading?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-center py-6 gap-x-3 rounded-xl ${isFeatured ? 'bg-[#363A3F]' : 'bg-[#F8F8F8]'
                }`}
        >
            {isLoading ? (
                <>
                    <div
                        className={`p-3 rounded-full animate-pulse ${isFeatured ? 'bg-[#4E5257]' : 'bg-gray-300'
                            }`}
                    >
                        <div className="w-6 h-6"></div>
                    </div>
                    <div className="space-y-2">
                        <div
                            className={`h-4 rounded w-20 animate-pulse ${isFeatured ? 'bg-[#4E5257]' : 'bg-gray-300'
                                }`}
                        ></div>
                        <div
                            className={`h-7 rounded w-28 animate-pulse ${isFeatured ? 'bg-[#4E5257]' : 'bg-gray-300'
                                }`}
                        ></div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`p-3 rounded-full ${isFeatured ? 'bg-[#4E5257]' : 'bg-[#EBE8E8]'
                            }`}
                    >
                        <Icon
                            className={`w-6 h-6 ${isFeatured ? 'text-[#C8EE44]' : 'text-black'
                                }`}
                        />
                    </div>
                    <div>
                        <p
                            className={`mb-1 ${isFeatured ? 'text-[#929EAE]' : 'text-[#929EAE]'
                                }`}
                        >
                            {label}
                        </p>
                        <p
                            className={`text-2xl font-bold ${isFeatured ? 'text-white' : 'text-black'
                                }`}
                        >
                            {formatCurrency(data?.amount || 0, { currency: data?.currency })}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}