import { action } from '@storybook/addon-actions'
import { Container, Row, Col } from 'react-bootstrap'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { Calendar } from './index'

export default {
  title: 'Components/Calendar',
  component: Calendar,
  args: {
    isBlockPastDates: true,
    selectedDate: new Date(),
    onDateSelected: action('onClick'),
  },
  argTypes: {
    isBlockPastDates: {
      description:
        'Define se os dias anteriores ao atual devem estar bloqueados',
    },
    selectedDate: {
      description: 'Define a data selecionada no calendário',
    },
    onDateSelected: {
      description: 'Função de callback na seleção de uma data',
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={6}>
            {Story()}
          </Col>
        </Row>
      </Container>
    ),
  ],
} as ComponentMeta<typeof Calendar>

export const Default: ComponentStoryObj<typeof Calendar> = {}

export const WithoutBlockPastDates: ComponentStoryObj<typeof Calendar> = {
  args: {
    isBlockPastDates: false,
    selectedDate: new Date(),
    onDateSelected: () => {},
  },
}
