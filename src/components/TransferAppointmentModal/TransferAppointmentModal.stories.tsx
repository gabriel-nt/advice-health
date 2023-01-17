import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { action } from '@storybook/addon-actions'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import { TransferAppointmentModal } from './index'

const clientApollo = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
})

export default {
  title: 'Components/TransferAppointmentModal',
  component: TransferAppointmentModal,
  args: {
    isOpen: true,
    appointment: {
      id: '1',
      doctorId: '1',
      eventDate: new Date(),
      startTimeInMinutes: 540,
    },
    onCloseModal: action('onCloseModal'),
    onSuccessModal: action('onSuccessModal'),
  },
  argTypes: {
    isOpen: {
      description: 'Define se o modal está aberto',
      table: {
        disable: true,
      },
    },
    appointment: {
      table: {
        disable: true,
      },
    },
    onCloseModal: {
      description: 'Função de callback do fechamento do modal',
    },
    onSuccessModal: {
      description: 'Função de callback no clique do botão "Confirmar"',
    },
  },
  decorators: [
    (Story) => <ApolloProvider client={clientApollo}>{Story()}</ApolloProvider>,
  ],
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof TransferAppointmentModal>

const Template: ComponentStory<typeof TransferAppointmentModal> = ({
  ...args
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = () => {
    setIsOpen(false)
    action('onCloseModal')
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Button
        variant="primary"
        className="text-white"
        onClick={handleOpenModal}
      >
        Abrir modal
      </Button>
      <TransferAppointmentModal
        {...args}
        isOpen={isOpen}
        onCloseModal={handleCloseModal}
      />
    </>
  )
}

export const Default = Template.bind({})
