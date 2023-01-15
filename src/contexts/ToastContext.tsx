import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from 'react'

import { ToastContainer } from '../components/ToastContainer'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: 'primary' | 'danger' | 'warning'
}

interface ToastContextData {
  removeToast(id: string): void
  addToast(message: Omit<ToastMessage, 'id'>): void
}

interface ToastProviderProps {
  children: React.ReactNode
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString()

      const toast = {
        id,
        type,
        title,
        description,
      }

      setMessages((state) => [...state, toast])
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => id !== message.id))
  }, [])

  const contextValue = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
