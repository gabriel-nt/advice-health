import { Modal } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react'

import { Calendar } from '../Calendar'
import { TimePicker } from '../TimePicker'
import { useToast } from '../../contexts/ToastContext'
import { useGetAppointmentByEventDateLazyQuery } from '../../graphql/generated'

interface OnSuccessData {
  eventDate: Date
  startTimeInMinutes: number
}

interface SelectEventDateModalProps {
  isOpen: boolean
  doctorId: string
  onCloseModal: () => void
  onSuccessModal: (data: OnSuccessData) => void
}

export function SelectEventDateModal({
  isOpen,
  doctorId,
  onCloseModal,
  onSuccessModal,
}: SelectEventDateModalProps) {
  const { addToast } = useToast()

  const [getAppointmentByEventDate] = useGetAppointmentByEventDateLazyQuery()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(
    null,
  )

  function handleClearSelectedValues() {
    setSelectedDate(null)
    setSelectedStartTime(null)
  }

  const handleCloseModal = useCallback(() => {
    handleClearSelectedValues()
    onCloseModal()
  }, [onCloseModal])

  const handleSelectEventDate = useCallback(async () => {
    if (selectedDate && selectedStartTime) {
      const { data } = await getAppointmentByEventDate({
        variables: {
          doctorId,
          eventDate: selectedDate,
          startTimeInMinutes: selectedStartTime,
        },
      })

      if (!data || data.appointments.length === 0) {
        handleCloseModal()
        onSuccessModal({
          eventDate: selectedDate,
          startTimeInMinutes: selectedStartTime,
        })
      } else {
        addToast({
          type: 'danger',
          title: 'Já existe um agendamento para o horário e data marcado!',
          description: 'Tente agendar em outro horário ou para outro médico.',
        })

        handleClearSelectedValues()
      }
    }
  }, [
    addToast,
    handleCloseModal,
    onSuccessModal,
    doctorId,
    selectedDate,
    selectedStartTime,
    getAppointmentByEventDate,
  ])

  useEffect(() => {
    if (selectedStartTime) {
      handleSelectEventDate()
    }
  }, [handleSelectEventDate, selectedStartTime])

  return (
    <Modal show={isOpen} onHide={onCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h6">
          Selecione {!selectedDate ? 'uma data' : 'um horário'} para a consulta:
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3 pb-3">
        {!selectedDate && (
          <Calendar
            onDateSelected={setSelectedDate}
            selectedDate={selectedDate}
          />
        )}

        {selectedDate && (
          <>
            <h6 className="mb-3">Selecione um horário para a consulta:</h6>
            <TimePicker onTimeSelected={setSelectedStartTime} />
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}
