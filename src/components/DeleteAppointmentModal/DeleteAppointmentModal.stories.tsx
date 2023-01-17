import { action } from '@storybook/addon-actions'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import { DeleteAppointmentModal } from './index'

const clientApollo = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
})

export default {
  title: 'Components/DeleteAppointmentModal',
  component: DeleteAppointmentModal,
  args: {
    isOpen: true,
    appointment: {
      id: '1',
      doctorId: '1',
    },
    onCloseModal: action('onCloseModal'),
    onSuccessModal: action('onSuccessModal'),
  },
  argTypes: {
    isOpen: {
      description: 'Define se o modal está aberto',
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
} as ComponentMeta<typeof DeleteAppointmentModal>

export const Default: ComponentStoryObj<typeof DeleteAppointmentModal> = {}
