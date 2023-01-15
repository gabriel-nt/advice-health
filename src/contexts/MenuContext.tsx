import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from 'react'

interface MenuContextData {
  isOpen: boolean
  onOpenMenu: () => void
  onCloseMenu: () => void
}

interface MenuContextProviderProps {
  children: React.ReactNode
}

export const MenuContext = createContext({} as MenuContextData)

export const MenuProvider = ({ children }: MenuContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenMenu = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpenMenu: handleOpenMenu,
      onCloseMenu: handleCloseMenu,
    }),
    [isOpen, handleOpenMenu, handleCloseMenu],
  )

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  )
}

export const useMenuContext = () => useContext(MenuContext)
