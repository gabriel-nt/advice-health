import { MenuProvider } from './MenuContext'
import { ToastProvider } from './ToastContext'

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <MenuProvider>
      <ToastProvider>{children}</ToastProvider>
    </MenuProvider>
  )
}
