import { useId } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'JAN', value: 400 },
    { name: 'FÉB', value: 600 },
    { name: 'MAR', value: 500 },
    { name: 'AVR', value: 900 },
    { name: 'MAI', value: 1200 },
    { name: 'JUIN', value: 1100 },
    { name: 'JUIL', value: 1800 },
];

export function PerformanceChart() {
    const chartId = useId();
    return (
        <div className="w-full h-[400px] mt-12">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    key={chartId}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id={`colorValue-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        key="xaxis"
                        dataKey="name"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        key="yaxis"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        key="tooltip"
                        contentStyle={{
                            backgroundColor: 'rgba(10, 14, 26, 0.9)',
                            borderColor: 'rgba(34, 211, 238, 0.3)',
                            color: '#fff',
                            borderRadius: '12px',
                            textTransform: 'uppercase'
                        }}
                    />
                    <Area
                        key="area"
                        type="monotone"
                        dataKey="value"
                        stroke="#22d3ee"
                        fillOpacity={1}
                        fill={`url(#colorValue-${chartId})`}
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
