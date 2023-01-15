import { Toast, ToastContainer as BsToastContainer } from 'react-bootstrap'

import { ToastMessage, useToast } from '../../contexts/ToastContext'

interface ToastContainerProps {
  messages: ToastMessage[]
}

export function ToastContainer({ messages }: ToastContainerProps) {
  const { removeToast } = useToast()

  return (
    <BsToastContainer position="top-end" className="p-3">
      {messages.map((item) => {
        setTimeout(() => {
          removeToast(item.id)
        }, 5000)

        return (
          <Toast className="d-inline-block m-1" bg={item.type} key={item.id}>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">{item.title}</strong>
            </Toast.Header>
            {item.description && (
              <Toast.Body className="text-white">{item.description}</Toast.Body>
            )}
          </Toast>
        )
      })}
    </BsToastContainer>
  )
}
