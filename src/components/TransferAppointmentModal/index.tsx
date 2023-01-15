import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import {
  useTransferAppointmentMutation,
  useGetAppointmentByEventDateLazyQuery,
} from '../../graphql/generated'

import { Calendar } from '../Calendar'
import { TimePicker } from '../TimePicker'
import { useToast } from '../../contexts/ToastContext'

interface TransferAppointmentModalProps {
  isOpen: boolean
  appointment: {
    id: string
    eventDate: Date
    doctorId: string
    startTimeInMinutes: number
  }
  onCloseModal: () => void
  onSuccessModal: () => void
}

export function TransferAppointmentModal({
  isOpen,
  appointment,
  onCloseModal,
  onSuccessModal,
}: TransferAppointmentModalProps) {
  const { addToast } = useToast()

  const [transferAppointment] = useTransferAppointmentMutation()
  const [getAppointmentByEventDate] = useGetAppointmentByEventDateLazyQuery()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(
    null,
  )

  const describedDate = dayjs(selectedDate).format('DD/MM/YYYY')
  const describedHour = dayjs
    .duration(selectedStartTime || 0, 'minutes')
    .format('HH:mm')

  const describedAppointmentDate = dayjs(appointment.eventDate).format(
    'DD/MM/YYYY',
  )
  const describedAppointmentHour = dayjs
    .duration(appointment.startTimeInMinutes, 'minutes')
    .format('HH:mm')

  const handleClearSelectedValues = useCallback(() => {
    setSelectedDate(null)
    setSelectedStartTime(null)
  }, [])

  const handleCloseModal = useCallback(() => {
    handleClearSelectedValues()
    onCloseModal()
  }, [onCloseModal, handleClearSelectedValues])

  const handleTransferAppointment = useCallback(async () => {
    if (selectedDate && selectedStartTime) {
      if (dayjs(appointment.eventDate).isAfter(new Date())) {
        const { data } = await getAppointmentByEventDate({
          variables: {
            eventDate: selectedDate,
            doctorId: appointment.doctorId,
            startTimeInMinutes: selectedStartTime,
          },
        })

        if (!data || data.appointments.length === 0) {
          await transferAppointment({
            variables: {
              id: appointment.id,
              eventDate: selectedDate,
              doctorId: appointment.doctorId,
              startTimeInMinutes: selectedStartTime,
              endTimeInMinutes: selectedStartTime + 30, // plus 30 min
            },
          })

          addToast({
            type: 'primary',
            title: `Consultar reagendada para ${describedDate} às ${describedHour}`,
          })

          onCloseModal()
          onSuccessModal()
        } else {
          addToast({
            type: 'danger',
            title: 'Já existe um agendamento para o horário e data marcado!',
            description: 'Tente agendar em outro horário ou para outro médico.',
          })

          handleClearSelectedValues()
        }
      } else {
        handleCloseModal()

        addToast({
          type: 'danger',
          title: 'O agendamento já ocorreu! Vc não pode transferí-lo.',
          description: 'Caso queira, pode atualizar as suas informações.',
        })
      }
    }
  }, [
    addToast,
    appointment,
    onCloseModal,
    selectedDate,
    describedDate,
    describedHour,
    onSuccessModal,
    handleCloseModal,
    selectedStartTime,
    transferAppointment,
    handleClearSelectedValues,
    getAppointmentByEventDate,
  ])

  return (
    <Modal show={isOpen} onHide={onCloseModal} centered>
      <Modal.Header className="border-0 mb-0">
        <Modal.Title className="h5">Transferir agendamento</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1 pb-2">
        {!selectedDate && (
          <>
            <p className="mb-3">Selecione uma nova data para a consulta:</p>
            <Calendar
              onDateSelected={setSelectedDate}
              selectedDate={selectedDate}
            />
          </>
        )}

        {selectedDate && !selectedStartTime && (
          <>
            <p className="mb-3">Selecione um horário para a consulta:</p>
            <TimePicker onTimeSelected={setSelectedStartTime} />
          </>
        )}

        {selectedDate && selectedStartTime && (
          <p>
            Você deseja, realmente, tranferir a consulta do dia{' '}
            <strong>
              {describedAppointmentDate} às {describedAppointmentHour}
            </strong>{' '}
            para o dia{' '}
            <strong>
              {describedDate} às {describedHour}
            </strong>
            ?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="outline-primary"
          onClick={
            selectedDate && selectedStartTime
              ? handleClearSelectedValues
              : handleCloseModal
          }
        >
          {selectedDate && selectedStartTime ? 'voltar' : 'cancelar'}
        </Button>
        <Button
          variant="primary"
          className="text-white"
          disabled={!selectedStartTime}
          onClick={handleTransferAppointment}
        >
          transferir
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
