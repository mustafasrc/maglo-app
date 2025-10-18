import { FaChevronRight } from "react-icons/fa6";
import { formatCurrency } from "@/utils/currency";
import { Transaction } from '@/types'
import moment from "moment";


interface RecentTransactionProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export default function RecentTransaction({ transactions, isLoading }: RecentTransactionProps) {
    return (
        <div className='border border-[#F5F5F5] p-5 rounded-xl'>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Recent Transactions</h2>
                    <a href="#" className="text-[#29A073] text-sm font-semibold flex items-center gap-x-2">
                        View All
                        <FaChevronRight />
                    </a>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="text-[#929EAE] text-sm font-semibold">
                            <th className="py-2 text-left">NAME/BUSINESS</th>
                            <th className="py-2">TYPE</th>
                            <th className="py-2">AMOUNT</th>
                            <th className="py-2">DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <th className="text-left py-2">
                                        <div className="flex items-center gap-x-3">
                                            <div className="p-3 bg-gray-200 rounded-xl w-12 h-12"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="py-2">
                                        <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                                    </th>
                                    <th className="py-2">
                                        <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                                    </th>
                                    <th className="py-2">
                                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                                    </th>
                                </tr>
                            ))
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <th className="text-left py-2">
                                        <div className="flex items-center gap-x-3">
                                            <div className="p-3 bg-[#E4F1FF] rounded-xl">
                                                <img
                                                    src={tx.image || "/user.png"}
                                                    alt="icon"
                                                    className="w-6 h-6"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[#1B212D] text-sm font-medium mb-0.5">
                                                    {tx.name}
                                                </p>
                                                <p className="text-[#929EAE] text-xs font-normal">
                                                    {tx.business}
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="py-2 text-[#929EAE] text-sm font-medium">{tx.type}</th>
                                    <th className="py-2 text-[#1B212D] font-semibold text-sm">
                                        {formatCurrency(tx.amount, { currency: tx.currency })}
                                    </th>
                                    <th className="py-2 text-[#929EAE] font-medium text-sm"> {moment(tx.date).format("DD MMM YYYY")}</th>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}