'use client'

import { useState } from 'react'
import {
    LayoutDashboard,
    Database,
    HardDrive,
    Activity,
    Shield,
    Settings,
    Search,
    Bell,
    Menu,
    Terminal,
    Cpu,
    Globe
} from 'lucide-react'

interface ControlCenterLayoutProps {
    children: React.ReactNode
    activeModule: string
    onModuleChange: (module: string) => void
}

export function ControlCenterLayout({ children, activeModule, onModuleChange }: ControlCenterLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'database', label: 'Database', icon: Database },
        { id: 'storage', label: 'Storage', icon: HardDrive },
        { id: 'video', label: 'Video Processing', icon: Activity },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'edge', label: 'Edge Network', icon: Globe },
        { id: 'logs', label: 'System Logs', icon: Terminal },
        { id: 'settings', label: 'Settings', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-slate-900 border-r border-slate-800 w-64`}
            >
                <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">Nucleus<span className="text-blue-500">Ops</span></span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeModule === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => onModuleChange(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                                {item.label}
                            </button>
                        )
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                            JS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">John Smith</p>
                            <p className="text-xs text-slate-500 truncate">Lead DevOps</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`${isSidebarOpen ? 'pl-64' : 'pl-0'} transition-all duration-300`}>
                {/* Top Header */}
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs">PROD</span>
                            <span className="text-slate-700">/</span>
                            <span className="text-slate-300 capitalize">{activeModule}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="bg-slate-950 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-slate-300 placeholder:text-slate-600"
                            />
                        </div>
                        <button className="relative p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
                        </button>
                    </div>
                </header>

                {/* Dynamic View */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
