'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SAGE = '#7B896F'

export interface RevenuePoint {
  month: string
  revenue: number
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SAGE} stopOpacity={0.35} />
              <stop offset="100%" stopColor={SAGE} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="text-border"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="currentColor"
            className="text-muted-foreground"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            stroke="currentColor"
            className="text-muted-foreground"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip
            cursor={{ stroke: SAGE, strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{
              borderRadius: '0.75rem',
              border: '1px solid hsl(var(--border))',
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
            }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={SAGE}
            strokeWidth={2.5}
            fill="url(#revFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
