/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { useNavigate } from '@tanstack/react-router'
import authService, { AuthTokens, LoginResponse } from '@renderer/lib/authService'
import { User } from '@renderer/types/user.type'

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  tokens: AuthTokens | null
}

export interface AuthContextType extends AuthState {
  logout: () => void
  login: (username: string, password: string) => Promise<LoginResponse>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    tokens: null
  })

  const navigate = useNavigate()

  useEffect(() => {
    const initializeAuth = async () => {
      const tokens = await authService.getTokens()
      const user = await authService.getUser()
      const isAuthenticated = await authService.isAuthenticated()

      setAuthState({
        isAuthenticated,
        isLoading: false,
        user,
        tokens
      })
    }

    initializeAuth()
  }, [])

  const refreshAuth = useCallback(async () => {
    const tokens = await authService.getTokens()
    const user = await authService.getUser()
    const isAuthenticated = await authService.isAuthenticated()

    setAuthState({
      isAuthenticated,
      isLoading: false,
      user,
      tokens
    })
  }, [])

  const login = useCallback(
    async (username: string, password: string): Promise<LoginResponse> => {
      try {
        const response = await authService.login(username, password)

        if (response.code) {
          authService.handleAuthSuccess(response)
          await refreshAuth()
        }

        return response
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    [refreshAuth]
  )

  const logout = useCallback(() => {
    authService.logout()
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      tokens: null
    })
    navigate({ to: '/' })
  }, [navigate])

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshAuth
  }

  return React.createElement(AuthContext.Provider, { value: contextValue }, children)
}

// useAuth hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
