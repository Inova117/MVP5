'use client'

import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Users, Globe, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'

// Simulated data generator
const generateData = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        time: `${10 + i}:00`,
        requests: Math.floor(Math.random() * 2000) + 3000,
        errors: Math.floor(Math.random() * 50) + 10,
        latency: Math.floor(Math.random() * 20) + 40,
    }))
}

export function OverviewModule() {
    const [data, setData] = useState(generateData(20))
    const [activeUsers, setActiveUsers] = useState(1243)

    // Real-time effect
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const next = [...prev.slice(1)]
                const last = prev[prev.length - 1]
                if (last) {
                    next.push({
                        time: last.time,
                        requests: Math.max(2000, last.requests + (Math.random() - 0.5) * 500),
                        errors: Math.max(5, last.errors + (Math.random() - 0.5) * 20),
                        latency: Math.max(20, last.latency + (Math.random() - 0.5) * 10),
                    })
                }
                return next
            })
            setActiveUsers(prev => Math.floor(prev + (Math.random() - 0.5) * 10))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-6">
            {/* KPI Cloud */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Active Sessions"
                    value={activeUsers.toLocaleString()}
                    trend="+12.5%"
                    trendUp={true}
                    icon={Users}
                    color="text-blue-500"
                />
                <KPICard
                    title="Avg. Latency"
                    value={`${Math.floor(data[data.length - 1]?.latency ?? 0)}ms`}
                    trend="-4.2%"
                    trendUp={true} // Lower is better, so green
                    icon={Zap}
                    color="text-yellow-500"
                />
                <KPICard
                    title="Global Requests"
                    value="24.5M"
                    trend="+8.1%"
                    trendUp={true}
                    icon={Globe}
                    color="text-purple-500"
                />
                <KPICard
                    title="Error Rate"
                    value="0.04%"
                    trend="+0.01%"
                    trendUp={false} // Higher is bad
                    icon={Activity}
                    color="text-red-500"
                />
            </div>

            {/* Main Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Traffic Volume</h3>
                            <p className="text-sm text-slate-500">Incoming requests per second (Global)</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> HTTP
                            </span>
                            <span className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span> WS
                            </span>
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis stroke="#475569" fontSize={12} tickFormatter={(val) => `${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    itemStyle={{ color: '#94a3b8' }}
                                />
                                <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-1">System Health</h3>
                    <p className="text-sm text-slate-500 mb-6">Real-time infrastructure status</p>

                    <div className="space-y-4">
                        <HealthItem name="Auth Service (GoTrue)" status="healthy" latency="45ms" />
                        <HealthItem name="Database (Postgres)" status="healthy" latency="12ms" />
                        <HealthItem name="Storage (S3-Compat)" status="healthy" latency="85ms" />
                        <HealthItem name="Video Transcoder" status="busy" latency="240ms" />
                        <HealthItem name="Edge Functions" status="healthy" latency="24ms" />
                        <HealthItem name="Email Gateway" status="healthy" latency="110ms" />
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors">
                            View Detailed Status Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KPICard({ title, value, trend, trendUp, icon: Icon, color }: any) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p - 2 rounded - lg bg - slate - 800 / 50 ${color} `}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items - center gap - 1 text - xs font - medium px - 2 py - 1 rounded - full ${trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    } `}>
                    {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-slate-500">{title}</div>
        </div>
    )
}

function HealthItem({ name, status, latency }: any) {
    const getStatusColor = (s: string) => {
        if (s === 'healthy') return 'bg-green-500'
        if (s === 'busy') return 'bg-yellow-500'
        return 'bg-red-500'
    }

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800/50">
            <div className="flex items-center gap-3">
                <div className={`w - 2 h - 2 rounded - full ${getStatusColor(status)} shadow - [0_0_8px_rgba(0, 0, 0, 0.5)]`} />
                <span className="text-sm font-medium text-slate-300">{name}</span>
            </div>
            <span className="font-mono text-xs text-slate-500">{latency}</span>
        </div>
    )
}
