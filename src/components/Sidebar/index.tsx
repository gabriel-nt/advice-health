import clsx from 'clsx'
import { Nav } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, CalendarPlus, House, SignOut } from 'phosphor-react'

import styles from './styles.module.scss'
import { useMenuContext } from '../../contexts/MenuContext'

export function Sidebar() {
  const { pathname } = useLocation()
  const { isOpen, onCloseMenu } = useMenuContext()

  const sidebarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('mouseleave', () => {
        onCloseMenu()
      })
    }
  }, [onCloseMenu])

  return (
    <div
      ref={sidebarRef}
      className={clsx(styles.sidebar, {
        [styles.sidebarOpen]: isOpen,
      })}
    >
      <Nav activeKey="/" className={styles.nav}>
        <Nav.Item
          className={clsx(styles.navItem, {
            'text-primary': pathname === '/',
          })}
          as={Link}
          to="/"
        >
          <div>
            <House size={24} />
          </div>
          <span>Dashboard</span>
        </Nav.Item>
        <Nav.Item
          className={clsx(styles.navItem, {
            'text-primary': pathname === '/agenda',
          })}
          as={Link}
          to="/agenda"
        >
          <div>
            <CalendarPlus size={24} />
          </div>
          <span>Agendamentos</span>
        </Nav.Item>
        <Nav.Item
          className={clsx(styles.navItem, {
            'text-primary': pathname.indexOf('consultas') !== -1,
          })}
          as={Link}
          to="/consultas"
        >
          <div>
            <Calendar size={24} />
          </div>
          <span>Consultas</span>
        </Nav.Item>
      </Nav>

      <div className={styles.logout}>
        <div>
          <SignOut size={24} />
          <span>Sair</span>
        </div>
      </div>
    </div>
  )
}
