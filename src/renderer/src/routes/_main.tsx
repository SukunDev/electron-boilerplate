import { AppHeader } from '@renderer/components/AppHeader'
import { AppSidebar } from '@renderer/components/AppSidebar'
import { SidebarInset, SidebarProvider } from '@renderer/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_main')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <AppHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
              <div className="max-w-7xl mx-auto p-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
