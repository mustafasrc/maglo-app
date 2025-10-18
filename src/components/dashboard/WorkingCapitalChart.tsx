import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WorkingCapitalItem } from '@/types'



interface IncomeExpenseChartProps {
    data: WorkingCapitalItem[];
    isLoading: boolean;
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value.toLocaleString('tr-TR')} ₺
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function IncomeExpenseChart({ data, isLoading = false }: IncomeExpenseChartProps) {
    const [chartType, setChartType] = useState('line');

    return (
        <div className='border border-[#F5F5F5] p-5 rounded-xl'>
            {isLoading ? (
                <div className="space-y-6 animate-pulse">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-200 rounded w-40"></div>
                        <div className="flex gap-2 items-center">
                            <div className="h-8 bg-gray-200 rounded w-24"></div>
                            <div className="h-8 bg-gray-200 rounded w-24"></div>
                            <div className="h-8 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>

                    {/* Legend Skeleton */}
                    <div className="flex justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>

                    {/* Chart Skeleton */}
                    <div className="h-80 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex items-end justify-around px-8 pb-12">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-200 rounded-t w-8"
                                    style={{ height: `${Math.random() * 60 + 40}%` }}
                                ></div>
                            ))}
                        </div>
                        {/* Y-axis labels skeleton */}
                        <div className="absolute left-2 top-8 bottom-12 flex flex-col justify-between">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-3 bg-gray-200 rounded w-8"></div>
                            ))}
                        </div>
                        {/* X-axis labels skeleton */}
                        <div className="absolute bottom-2 left-12 right-8 flex justify-between">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-3 bg-gray-200 rounded w-10"></div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-semibold">Working Capital</h2>
                        <div className='flex gap-2 items-center'>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setChartType('line')}
                                    className={`text-xs transition-all p-2 rounded-xl ${chartType === 'line'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Line
                                </button>
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={`text-xs transition-all p-2 rounded-xl ${chartType === 'bar'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Bar
                                </button>
                            </div>
                            <select name="" id="" className='text-xs bg-[#F8F8F8] p-2 rounded-xl outline-0'>
                                <option value="">Last 7 Days</option>
                            </select>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={400}>
                        {chartType === 'line' ? (
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="month"
                                    stroke="none"
                                    tick={{ fill: '#929EAE' }}
                                    style={{ fontSize: '14px' }}
                                    padding={{ left: 20, right: 20 }}
                                />
                                <YAxis
                                    stroke="none"
                                    tick={{ fill: '#929EAE' }}
                                    style={{ fontSize: '14px' }}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                    padding={{ top: 20, bottom: 20 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="top"
                                    height={50}
                                    iconType="circle"
                                    wrapperStyle={{ color: '#1B212D', fontSize: '12px' }}
                                    formatter={(value: string) => {
                                        const labels: Record<string, string> = {
                                            income: 'Income',
                                            expense: 'Expense',
                                            net: 'Net'
                                        };
                                        return labels[value] || value;
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ fill: '#10b981', r: 5 }}
                                    activeDot={{ r: 7 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ fill: '#ef4444', r: 5 }}
                                    activeDot={{ r: 7 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="net"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3b82f6', r: 5 }}
                                    activeDot={{ r: 7 }}
                                />
                            </LineChart>
                        ) : (
                            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="month"
                                    stroke="none"
                                    tick={{ fill: '#929EAE' }}
                                    style={{ fontSize: '14px' }}
                                    padding={{ left: 20, right: 20 }}
                                />
                                <YAxis
                                    stroke="none"
                                    tick={{ fill: '#929EAE' }}
                                    style={{ fontSize: '14px' }}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                    padding={{ top: 20, bottom: 20 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="top"
                                    height={50}
                                    iconType="circle"
                                    wrapperStyle={{ color: '#1B212D', fontSize: '12px' }}
                                    formatter={(value: string) => {
                                        const labels: Record<string, string> = {
                                            income: 'Income',
                                            expense: 'Expense',
                                            net: 'Net'
                                        };
                                        return labels[value] || value;
                                    }}
                                />
                                <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="net" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
}