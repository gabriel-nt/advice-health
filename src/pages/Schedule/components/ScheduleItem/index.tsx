import clsx from 'clsx'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  XCircle,
  FolderUser,
  PlusCircle,
  UserCircle,
  TrashSimple,
  PencilSimple,
} from 'phosphor-react'

import styles from './styles.module.scss'
import { cpfMask } from '../../../../utils/cpfMask'
import { phoneMask } from '../../../../utils/phoneMask'
import { TransferAppointmentModal } from '../../../../components/TransferAppointmentModal'
import { DeleteAppointmentModal } from '../../../../components/DeleteAppointmentModal'

interface ScheduleItemProps {
  startTimeInMinutes: number
  disabled: boolean
  onUpdateOrDelete: () => void
  schedule: {
    targetDate: Date
    targetDoctorId?: string
  }
  data?: {
    id: string
    doctor?: {
      id: string
    } | null
    eventDate: Date
    patientName: string
    patientDocument: string
    patientPhone: string
    patientBirthday: string
    startTimeInMinutes: number
    endTimeInMinutes: number
  }
}

export function ScheduleItem({
  data,
  disabled,
  schedule,
  onUpdateOrDelete,
  startTimeInMinutes,
}: ScheduleItemProps) {
  const navigate = useNavigate()

  const startTimeInHours = dayjs
    .duration(startTimeInMinutes, 'minutes')
    .format('HH:mm')

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false)

  const handleShowTranfersModal = () => setIsOpenTransferModal(true)
  const handleCloseTranfersModal = () => setIsOpenTransferModal(false)

  const handleShowDeleteModal = () => setIsOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false)

  const handleEditAppointment = useCallback(() => {
    navigate(`/consultas/${data?.id}`)
  }, [navigate, data])

  const handleToCreateAppointment = useCallback(() => {
    navigate('/criar-agendamento', {
      state: {
        startTimeInMinutes,
        eventDate: schedule?.targetDate,
        doctorId: schedule?.targetDoctorId,
      },
    })
  }, [navigate, schedule, startTimeInMinutes])

  return (
    <div
      className={clsx(styles.appointmentContainer, {
        [styles.appointmentDisabled]: disabled,
      })}
    >
      <h6>{startTimeInHours}</h6>

      <div className={styles.appointmentInfo}>
        {disabled && <strong>Horário de almoço</strong>}
        {!disabled && !data && <strong>Horário livre</strong>}
        {data && (
          <>
            <UserCircle size={36} />

            <div className="d-flex flex-column mx-2 text-black">
              <strong>{data?.patientName}</strong>
              <span>
                Documento: {cpfMask(data?.patientDocument)} | Telefone:{' '}
                {phoneMask(data?.patientPhone)}
              </span>
            </div>
          </>
        )}
      </div>

      <div className={styles.appointmentActions}>
        {data && (
          <>
            <FolderUser size={20} onClick={handleShowTranfersModal} />
            <TrashSimple size={20} onClick={handleShowDeleteModal} />
            <PencilSimple size={20} onClick={handleEditAppointment} />
          </>
        )}

        {disabled && <XCircle size={22} weight="thin" color="red" />}

        {!disabled && !data && (
          <PlusCircle
            size={22}
            weight="thin"
            color="green"
            onClick={handleToCreateAppointment}
          />
        )}
      </div>

      {data && (
        <>
          <TransferAppointmentModal
            appointment={{
              id: data.id,
              doctorId: data.doctor!.id,
              eventDate: data.eventDate,
              startTimeInMinutes: data.startTimeInMinutes,
            }}
            isOpen={isOpenTransferModal}
            onSuccessModal={onUpdateOrDelete}
            onCloseModal={handleCloseTranfersModal}
          />

          <DeleteAppointmentModal
            appointment={{
              id: data?.id,
              doctorId: data?.doctor!.id,
            }}
            isOpen={isOpenDeleteModal}
            onSuccessModal={onUpdateOrDelete}
            onCloseModal={handleCloseDeleteModal}
          />
        </>
      )}
    </div>
  )
}
