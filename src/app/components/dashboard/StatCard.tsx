import { formatCurrency } from "@/app/utils/currency";

export default function StatCard({
    icon: Icon,
    label,
    value,
    isFeatured = false,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string | number;
    isFeatured?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-center py-6 gap-x-3 rounded-xl ${isFeatured ? 'bg-[#363A3F]' : 'bg-[#F8F8F8]'
                }`}
        >
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
                    {formatCurrency(value, { locale: "en-US", symbol: "$" })}
                </p>
            </div>
        </div>
    );
}
