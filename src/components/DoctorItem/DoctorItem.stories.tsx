import { action } from '@storybook/addon-actions'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { DoctorItem } from './index'

export default {
  title: 'Components/DoctorItem',
  component: DoctorItem,
  args: {
    doctor: {
      id: '1',
      bio: 'Mid-Fullstack Developer',
      name: 'Gabriel Teixeira',
      avatarURL: 'https://github.com/gabriel-nt.png',
    },
    onSelectDoctor: action('onClick'),
    isSelected: true,
  },
  argTypes: {
    doctor: {
      description: 'Informações do médico',
    },
    isSelected: {
      description: 'Define se o card está selecionado',
    },
    onSelectDoctor: {
      description: 'Função de callback no clique do card',
    },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof DoctorItem>

export const Default: ComponentStoryObj<typeof DoctorItem> = {}
