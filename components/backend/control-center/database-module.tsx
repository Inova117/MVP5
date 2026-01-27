'use client'

import { useState } from 'react'
import { Search, Play, RefreshCw, Download, Plus, Trash, Edit, Terminal, Database } from 'lucide-react'

const MOCK_TABLES = ['profiles', 'courses', 'modules', 'lessons', 'enrollments']
const MOCK_DATA: any = {
    profiles: [
        { id: '8f92-a1b2', full_name: 'Sarah Johnson', role: 'instructor', created_at: '2025-06-12' },
        { id: '9c23-d4e5', full_name: 'Mike Chen', role: 'instructor', created_at: '2025-06-15' },
        { id: '1a2b-3c4d', full_name: 'Alice W.', role: 'student', created_at: '2025-07-01' },
        { id: '5e6f-7g8h', full_name: 'Bob M.', role: 'student', created_at: '2025-07-02' },
    ],
    courses: [
        { id: 'c1-web-dev', title: 'Web Dev Bootcamp', price: 99.99, status: 'published' },
        { id: 'c2-data-sci', title: 'Data Science 101', price: 149.99, status: 'published' },
        { id: 'c3-react-adv', title: 'Advanced React', price: 79.99, status: 'draft' },
    ]
}

export function DatabaseModule() {
    const [activeTable, setActiveTable] = useState('profiles')
    const [sqlQuery, setSqlQuery] = useState('SELECT * FROM profiles LIMIT 10;')
    // const [queryResult, setQueryResult] = useState<any>(null)
    const [isExecuting, setIsExecuting] = useState(false)

    const handleRunQuery = () => {
        setIsExecuting(true)
        setTimeout(() => {
            // setQueryResult(MOCK_DATA[activeTable] || [])
            setIsExecuting(false)
        }, 600)
    }

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Data Explorer</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm border border-slate-700 transition">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-blue-900/20">
                        <Plus className="w-4 h-4" /> New Record
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Sidebar: Tables & SQL */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Tables</h3>
                            <button className="text-slate-500 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-1">
                            {MOCK_TABLES.map(table => (
                                <button
                                    key={table}
                                    onClick={() => setActiveTable(table)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors flex justify-between items-center ${activeTable === table ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <span>{table}</span>
                                    <span className="text-xs text-slate-600">{MOCK_DATA[table]?.length || 0} rows</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                            <Terminal className="w-4 h-4 text-green-500" />
                            <h3 className="text-sm font-semibold text-white">SQL Runner</h3>
                        </div>
                        <textarea
                            value={sqlQuery}
                            onChange={(e) => setSqlQuery(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-green-400 focus:outline-none focus:border-green-500/50 resize-none mb-3"
                        />
                        <button
                            onClick={handleRunQuery}
                            disabled={isExecuting}
                            className="w-full py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                            Run Query
                        </button>
                    </div>
                </div>

                {/* Main Table View */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Filter rows..."
                                className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 w-64"
                            />
                        </div>
                        <div className="flex gap-2 text-sm text-slate-500 font-mono">
                            <span>1 - {MOCK_DATA[activeTable]?.length || 0} of {MOCK_DATA[activeTable]?.length || 0}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-950 text-slate-400 font-medium sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 border-b border-slate-800"></th>
                                    {MOCK_DATA[activeTable] && Object.keys(MOCK_DATA[activeTable][0]).map(key => (
                                        <th key={key} className="px-6 py-3 border-b border-slate-800 font-mono">{key}</th>
                                    ))}
                                    <th className="px-6 py-3 border-b border-slate-800 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {(MOCK_DATA[activeTable] || []).map((row: any, i: number) => (
                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-3 text-slate-600 w-10">{i + 1}</td>
                                        {Object.values(row).map((val: any, j) => (
                                            <td key={j} className="px-6 py-3 text-slate-300">
                                                {String(val)}
                                            </td>
                                        ))}
                                        <td className="px-6 py-3 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-1 hover:bg-slate-700 rounded text-blue-400"><Edit className="w-4 h-4" /></button>
                                                <button className="p-1 hover:bg-slate-700 rounded text-red-400"><Trash className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!MOCK_DATA[activeTable] || MOCK_DATA[activeTable].length === 0) && (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-500">
                                <Database className="w-12 h-12 mb-4 opacity-20" />
                                <p>No data found in table '{activeTable}'</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
