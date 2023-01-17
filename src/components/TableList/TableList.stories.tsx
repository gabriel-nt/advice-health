import { action } from '@storybook/addon-actions'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { TableList } from './index'

export default {
  title: 'Components/TableList',
  component: TableList,
  args: {
    title: 'Lembretes',
    isLoading: false,
    properties: [
      {
        key: 'id',
        label: 'ID',
      },
      {
        key: 'stickyNote',
        label: 'Lembrete',
      },
      {
        key: 'date',
        label: 'Data',
      },
    ],
    data: [
      {
        id: '1',
        date: '01/01/2023',
        stickyNote: 'Lembrete 01',
      },
      {
        id: '2',
        date: '01/01/2023',
        stickyNote: 'Lembrete 02',
      },
    ],
    pagination: {
      skipNumber: 5,
      totalPages: 1,
      onChangePage: action('handleChangePage'),
    },
  },
  argTypes: {
    title: {
      description: 'Título da tabela',
    },
    isLoading: {
      description: 'Exibe o loading da tabela',
    },
    pagination: {
      table: {
        disable: true,
      },
    },
    properties: {
      description:
        'Vetor de propriedade utilizadas para montar o cabeçalho e exibir os dados da tabela',
    },
    data: {
      description: 'Dados da tabela',
    },
  },
} as ComponentMeta<typeof TableList>

export const Default: ComponentStoryObj<typeof TableList> = {}
