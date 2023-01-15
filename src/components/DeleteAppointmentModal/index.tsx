import { Modal, Button } from 'react-bootstrap'

import { useToast } from '../../contexts/ToastContext'
import { useDeleteAppointmentMutation } from '../../graphql/generated'

interface DeleteAppointmentModalProps {
  isOpen: boolean
  appointment: {
    id?: string
    doctorId?: string
  }
  onCloseModal: () => void
  onSuccessModal: () => void
}

export function DeleteAppointmentModal({
  isOpen,
  appointment,
  onCloseModal,
  onSuccessModal,
}: DeleteAppointmentModalProps) {
  const { addToast } = useToast()
  const [deleteAppointment] = useDeleteAppointmentMutation()

  async function handleDeleteAppointment() {
    try {
      await deleteAppointment({
        variables: {
          id: appointment.id,
          doctorId: appointment.doctorId,
        },
      })

      addToast({
        type: 'primary',
        title: 'Agendamento excluído com sucesso.',
        description: 'Acompanhe os agendamentos da página de Consultas.',
      })

      onCloseModal()
      onSuccessModal()
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Opps, ocorreu um erro ao excluir o agendamento.',
        description: 'Tente novamente em alguns instantes.',
      })
    }
  }

  return (
    <Modal show={isOpen} onHide={onCloseModal} centered>
      <Modal.Header className="border-0 mb-0">
        <Modal.Title className="h5">Excluir consulta</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1 pb-2">
        Tem certeza que deseja excluir o agendamento?
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="outline-danger" onClick={onCloseModal}>
          cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteAppointment}>
          deletar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
