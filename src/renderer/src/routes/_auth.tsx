import { Button } from '@renderer/components/ui/button'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Minus, Square, X } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <>
      <header
        className="fixed top-0 inset-x-0 flex h-14 shrink-0 items-center gap-2 border-b-3 border-neutral-800 px-6 py-4 bg-main"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex space-x-2">
            <Button
              size="icon"
              className="relative text-foreground bg-white"
              onClick={() => window.api.window.minimize()}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
              <Minus />
            </Button>
            <Button
              size="icon"
              className="relative text-foreground bg-white"
              onClick={() => window.api.window.maximize()}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
              <Square />
            </Button>
            <Button
              size="icon"
              className="relative text-foreground bg-white"
              onClick={() => window.api.window.close()}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
              <X />
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  )
}
