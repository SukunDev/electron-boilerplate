/**
 * Auth Route Component
 *
 * Wrapper component that ensures user is authenticated before accessing protected pages
 */

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { useNavigate } from '@tanstack/react-router'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps): React.JSX.Element {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate({ to: '/signin' })
        return
      }
    }
  }, [isAuthenticated, isLoading, navigate])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[999]">
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
            <p className="text-primary-foreground/70">Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated) {
    return <></>
  }

  // User is authenticated and has required role, render children
  return <>{children}</>
}

export default ProtectedRoute
