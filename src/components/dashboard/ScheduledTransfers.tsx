import { FaChevronRight } from "react-icons/fa6";
import { formatCurrency } from "@/utils/currency";
import { ScheduledTransfer } from "@/types";
import moment from "moment";


interface ScheduledTransfersProps {
    scheduledTransfers: ScheduledTransfer[];
    isLoading: boolean;
}

export default function ScheduledTransfers({
    scheduledTransfers,
    isLoading,
}: ScheduledTransfersProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Scheduled Transfers</h2>
                <a
                    href="#"
                    className="text-[#29A073] text-sm font-semibold flex items-center gap-x-2"
                >
                    View All
                    <FaChevronRight />
                </a>
            </div>

            {isLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : scheduledTransfers.length === 0 ? (
                <p className="text-sm text-gray-500">No scheduled transfers.</p>
            ) : (
                <ul>
                    {scheduledTransfers.map((transfer) => (
                        <li
                            key={transfer.id}
                            className="flex justify-between items-center border-b border-[#FAFAFA] py-5"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={transfer.image || "/user.png"}
                                    alt={transfer.name}
                                    className="w-8 h-8 rounded-full border border-gray-100"
                                />
                                <div>
                                    <p className="text-[#1B212D] text-sm font-semibold">
                                        {transfer.name}
                                    </p>
                                    <span className="text-[#929EAE] text-xs font-medium">
                                        {moment(transfer.date).format("MMMM DD, YYYY [at] HH:mm")}
                                    </span>
                                </div>
                            </div>
                            <div className="font-semibold text-base">
                                {formatCurrency(transfer.amount, { currency: transfer.currency })}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
