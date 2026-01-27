'use client'

import { Shield, Globe, CheckCircle, File, Clock, RotateCcw } from 'lucide-react'

export function SecurityModule() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-500" />
                        Active Threat Mitigation
                    </h3>
                    <div className="space-y-4">
                        <SecurityToggle label="Global Rate Limiting" active={true} />
                        <SecurityToggle label="SQL Injection Filter (WAF)" active={true} description="Blocking malicious payloads at edge" />
                        <SecurityToggle label="DDoS Protection" active={true} />
                        <SecurityToggle label="Bot Challenge Mode" active={false} description="Inactive (Normal Traffic Levels)" />
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-500" />
                        Live Access Log
                    </h3>
                    <div className="space-y-2 font-mono text-xs max-h-[300px] overflow-auto">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex gap-3 pb-2 border-b border-slate-800/50 last:border-0">
                                <span className="text-slate-500">10:42:{10 + i}</span>
                                <span className={i % 3 === 0 ? 'text-red-400' : 'text-green-400'}>
                                    {i % 3 === 0 ? 'BLOCK' : 'ALLOW'}
                                </span>
                                <span className="text-slate-300">
                                    {i % 3 === 0 ? '192.168.1.X (Rate Limit Exceeded)' : '10.0.0.5 (Valid Token)'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SecurityToggle({ label, active, description }: any) {
    return (
        <div className="flex items-start justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div>
                <div className="font-medium text-slate-200">{label}</div>
                {description && <div className="text-xs text-slate-500 mt-1">{description}</div>}
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-green-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`} />
            </div>
        </div>
    )
}

export function StorageModule() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden min-h-[500px] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="hover:text-white cursor-pointer">buckets</span>
                    <span>/</span>
                    <span className="text-white font-medium">course-content</span>
                </div>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['intro_video.mp4', 'chapter_1.pdf', 'assets.zip', 'thumbnail.jpg'].map((file, i) => (
                    <div key={i} className="group p-4 bg-slate-950 border border-slate-800 hover:border-blue-500/50 rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-all">
                        <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                            <File className="w-6 h-6 text-slate-500" />
                        </div>
                        <span className="text-sm text-slate-300 text-center truncate w-full">{file}</span>
                    </div>
                ))}
                <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-slate-600 hover:text-slate-400 transition-colors cursor-pointer">
                    <PlusIcon />
                    <span className="text-xs">Upload</span>
                </div>
            </div>
        </div>
    )
}

function PlusIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    )
}

export function VideoModule() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Transcoding Queue</h2>
                <div className="text-sm text-slate-400">Processing Node: <span className="text-green-400">us-east-1a</span></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Column title="Queued" count={2} color="border-slate-700">
                    <JobCard id="job-8921" title="React Advanced - Ep 5" size="1.2GB" status="waiting" />
                    <JobCard id="job-8922" title="Intro to SQL - Part 3" size="850MB" status="waiting" />
                </Column>
                <Column title="Processing" count={1} color="border-blue-500/50">
                    <JobCard id="job-8920" title="Next.js Patterns" size="2.4GB" status="processing" progress={45} />
                </Column>
                <Column title="Completed" count={12} color="border-green-500/50">
                    <JobCard id="job-8919" title="Web Dev Intro" size="500MB" status="done" />
                    <JobCard id="job-8915" title="CSS Grid Mastery" size="1.1GB" status="done" />
                </Column>
            </div>
        </div>
    )
}

function Column({ title, count, children, color }: any) {
    return (
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col h-full">
            <div className={`p-4 border-b border-slate-800 flex justify-between items-center border-t-4 ${color} rounded-t-xl`}>
                <h3 className="font-semibold text-slate-300">{title}</h3>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{count}</span>
            </div>
            <div className="p-4 space-y-3 flex-1 bg-slate-950/30">
                {children}
            </div>
        </div>
    )
}

function JobCard({ id, title, size, status, progress }: any) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-sm hover:border-slate-700 transition-colors cursor-move">
            <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-slate-500">{id}</span>
                {status === 'processing' && <RotateCcw className="w-3 h-3 text-blue-500 animate-spin" />}
                {status === 'done' && <CheckCircle className="w-3 h-3 text-green-500" />}
                {status === 'waiting' && <Clock className="w-3 h-3 text-slate-500" />}
            </div>
            <h4 className="font-medium text-slate-200 text-sm mb-1">{title}</h4>
            <div className="flex justify-between items-center text-xs text-slate-500">
                <span>{size}</span>
                <span>MP4 -&gt; HLS</span>
            </div>
            {progress !== undefined && (
                <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    )
}
