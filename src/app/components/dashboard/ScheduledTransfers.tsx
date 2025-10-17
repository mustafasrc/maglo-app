import { FaChevronRight } from "react-icons/fa6";
import { formatCurrency } from "@/app/utils/currency";


export default function ScheduledTransfers() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Scheduled Transfers</h2>
                <a href="#" className="text-[#29A073] text-sm font-semibold flex items-center gap-x-2">
                    View All
                    <FaChevronRight />
                </a>
            </div>

            <ul>
                <li className="flex justify-between items-center border-b border-[#FAFAFA] py-5">
                    <div className="flex items-center gap-4">
                        <img src="/user.png" alt="" className=" w-8 h-8 rounded-full border border-gray-100" />
                        <div>
                            <p className="text-[#1B212D] text-sm font-semibold">Salah Ahmad</p>
                            <span className="text-[#929EAE] text-xs font-medium">April 28, 2022 at 11:00</span>
                        </div>
                    </div>
                    <div className="font-semibold text-base">
                        -  {formatCurrency(5564, { locale: "en-US", symbol: "$" })}

                    </div>
                </li>
            </ul>
        </div>
    );
}