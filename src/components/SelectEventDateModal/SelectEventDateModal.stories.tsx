import { action } from '@storybook/addon-actions'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import '../../lib/dayjs'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { SelectEventDateModal } from './index'

const clientApollo = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
})

export default {
  title: 'Components/SelectEventDateModal',
  component: SelectEventDateModal,
  args: {
    isOpen: true,
    doctorId: '1',
    onCloseModal: action('onCloseModal'),
    onSuccessModal: action('onSuccessModal'),
  },
  argTypes: {
    doctorId: {
      description: 'Id do médico, para consulta de disponibilidade',
    },
    isOpen: {
      description: 'Define se o modal está aberto',
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
} as ComponentMeta<typeof SelectEventDateModal>

const Template: ComponentStory<typeof SelectEventDateModal> = ({ ...args }) => {
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
      <SelectEventDateModal
        {...args}
        isOpen={isOpen}
        onCloseModal={handleCloseModal}
      />
    </>
  )
}

export const Default = Template.bind({})
