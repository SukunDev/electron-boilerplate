import { AppHeader } from '@renderer/components/AppHeader'
import { AppSidebar } from '@renderer/components/AppSidebar'
import { SidebarInset, SidebarProvider } from '@renderer/components/ui/sidebar'
import ProtectedRoute from '@renderer/contexts/ProtectedRoute'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_main')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-screen bg-neutral-900">
            <AppHeader />
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
