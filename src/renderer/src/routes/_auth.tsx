import { Button } from '@renderer/components/ui/button'
import AuthRoute from '@renderer/contexts/AuthRoute'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Minus, Square, X } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <AuthRoute>
      <header
        className="flex h-14 shrink-0 items-center gap-2 border-b border-neutral-800 px-6 py-4"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-neutral-400 hover:bg-neutral-800 hover:text-white"
              onClick={() => window.api.window.minimize()}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
              <Minus />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-neutral-400 hover:bg-neutral-800 hover:text-white"
              onClick={() => window.api.window.maximize()}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
              <Square />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-neutral-400 hover:bg-neutral-800 hover:text-white"
              onClick={() => window.api.window.close()}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
              <X />
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
    </AuthRoute>
  )
}
