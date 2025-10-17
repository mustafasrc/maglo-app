import { FaChevronRight } from "react-icons/fa6";
import { formatCurrency } from "@/utils/currency";

export default function RecentTransaction() {
    return (
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
                        <th className=" py-2 text-left">NAME/BUSINESS</th>
                        <th className=" py-2">TYPE</th>
                        <th className=" py-2">AMOUNT</th>
                        <th className=" py-2">DATE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="text-left py-2">
                            <div className="flex items-center gap-x-3">
                                <div className="p-3 bg-[#E4F1FF] rounded-xl">
                                    <img src="/user.png" alt="icon" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[#1B212D] text-sm font-medium mb-0.5">Iphone 13 Pro MAX</p>
                                    <p className="text-[#929EAE] text-xs font-normal">Apple. Inc</p>
                                </div>
                            </div>
                        </th>
                        <th className="py-2 text-[#929EAE] text-sm font-medium">Mobile</th>
                        <th className="py-2 text-[#1B212D] font-semibold text-sm">
                            {formatCurrency(5564, { locale: "en-US", symbol: "$" })}
                        </th>
                        <th className="py-2 text-[#929EAE] font-medium text-sm">14 Apr 2022</th>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}