import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { ToastContainer } from './index'

export default {
  title: 'Components/ToastContainer',
  component: ToastContainer,
  args: {
    messages: [
      {
        id: '1',
        type: 'primary',
        title: 'Título autoexplicativo',
        description: 'Descrição autoexplicativa',
      },
      {
        id: '2',
        type: 'danger',
        title: 'Título autoexplicativo',
        description: 'Descrição autoexplicativa',
      },
    ],
  },
  argTypes: {
    messages: {
      description: 'Vetor de mensagens a serem exibidas',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ToastContainer>

export const Default: ComponentStoryObj<typeof ToastContainer> = {}
