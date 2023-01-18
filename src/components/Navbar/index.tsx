import { List } from 'phosphor-react'
import { Navbar as BsNavbar, Nav, Image } from 'react-bootstrap'

import logoImg from '../../assets/logo.png'

import styles from './styles.module.scss'
import { useMenuContext } from '../../contexts/MenuContext'

export function Navbar() {
  const { onCloseMenu, onOpenMenu, isOpen } = useMenuContext()

  function handleToggleMenu() {
    if (isOpen) {
      onCloseMenu()
    } else {
      onOpenMenu()
    }
  }

  return (
    <BsNavbar
      bg="primary"
      style={{
        zIndex: 100,
      }}
      className="ps-3 pe-3 position-sticky top-0"
    >
      <button
        type="button"
        onClick={handleToggleMenu}
        className={styles.menuButton}
      >
        <List size={24} />
      </button>
      <div className="d-flex justify-content-between w-100 align-items-center">
        <BsNavbar.Text className={styles.brand} as="div">
          <BsNavbar.Brand>
            <Image src={logoImg} alt="admin user image" />
          </BsNavbar.Brand>
          <h5>Health App</h5>
        </BsNavbar.Text>
        <Nav className={styles.profile}>
          <Image
            roundedCircle
            alt="admin user photo"
            src="https://github.com/gabriel-nt.png"
          />
          <span>Gabriel</span>
        </Nav>
      </div>
    </BsNavbar>
  )
}
