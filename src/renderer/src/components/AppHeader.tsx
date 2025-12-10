import { Button } from '@renderer/components/ui/button'
import { SidebarTrigger } from '@renderer/components/ui/sidebar'
import { Separator } from '@renderer/components/ui/separator'
import { Bell, ChevronRight, Minus, Square, X } from 'lucide-react'

export function AppHeader(): React.JSX.Element {
  return (
    <header
      className="flex h-16 shrink-0 items-center gap-2 bg-main border-b-3 px-6 py-4"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <SidebarTrigger
        variant="noShadow"
        size="icon"
        className="relative border-none"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      />
      <Separator orientation="vertical" className="mr-2 h-40" />

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <span>Dashboard</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">Overview</span>
      </div>

      <div className="flex flex-1 items-center justify-end space-x-4">
        {/* Notifications */}
        <Button
          variant="noShadow"
          size="icon"
          className="relative border-none"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4 bg-neutral-700" />
        <div className="flex space-x-2">
          <Button
            // variant="ghost"
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
  )
}
