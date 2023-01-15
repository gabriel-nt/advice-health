import clsx from 'clsx'
import { UserCircle } from 'phosphor-react'
import { Image, Button } from 'react-bootstrap'

import styles from './styles.module.scss'

interface Doctor {
  id: string
  name: string
  bio: string
  avatarURL: string
}

interface DoctorItemProps {
  doctor: Doctor
  isSelected?: boolean
  onSelectDoctor?: (doctor: Doctor) => void
}

export function DoctorItem({
  onSelectDoctor,
  isSelected = false,
  doctor: { avatarURL, bio, name, id },
}: DoctorItemProps) {
  function handleSelectDoctor() {
    if (onSelectDoctor) {
      onSelectDoctor({
        avatarURL,
        bio,
        name,
        id,
      })
    }
  }

  return (
    <Button
      type="submit"
      onClick={handleSelectDoctor}
      className={clsx(styles.doctorItem, {
        'border-0': !isSelected,
      })}
    >
      {avatarURL ? (
        <Image src={avatarURL} alt={name} roundedCircle />
      ) : (
        <UserCircle size={36} />
      )}

      <div className="d-flex flex-column ms-3 text-black">
        <strong>{name}</strong>
        <span>{bio}</span>
      </div>
    </Button>
  )
}
