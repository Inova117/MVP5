// Backend Control Center - Enterprise Operations Dashboard
'use client'

import { useState } from 'react'
import { ControlCenterLayout } from '@/components/backend/control-center/main-layout'
import { OverviewModule } from '@/components/backend/control-center/overview-module'
import { DatabaseModule } from '@/components/backend/control-center/database-module'
import { SecurityModule, StorageModule, VideoModule } from '@/components/backend/control-center/secondary-modules'
import { Construction } from 'lucide-react'

export default function BackendPage() {
  const [activeModule, setActiveModule] = useState('overview')

  return (
    <ControlCenterLayout activeModule={activeModule} onModuleChange={setActiveModule}>
      {activeModule === 'overview' && <OverviewModule />}
      {activeModule === 'database' && <DatabaseModule />}
      {activeModule === 'security' && <SecurityModule />}
      {activeModule === 'storage' && <StorageModule />}
      {activeModule === 'video' && <VideoModule />}

      {['edge', 'logs', 'settings'].includes(activeModule) && (
        <div className="h-[60vh] flex flex-col items-center justify-center text-slate-500">
          <Construction className="w-16 h-16 mb-4 opacity-20" />
          <h2 className="text-xl font-semibold text-slate-400">Module Under Construction</h2>
          <p className="text-sm">This operational module is coming in the next sprint.</p>
        </div>
      )}
    </ControlCenterLayout>
  )
}
