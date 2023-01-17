import { action } from '@storybook/addon-actions'
import { Container, Row, Col } from 'react-bootstrap'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import '../../lib/dayjs'
import { TimePicker } from './index'

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  args: {
    onTimeSelected: action('onTimeSelected'),
  },
  argTypes: {
    onTimeSelected: {
      description: 'Função de callback da seleção de um horário',
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={8}>
            <h6>Selecione um horário:</h6>
            {Story()}
          </Col>
        </Row>
      </Container>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof TimePicker>

export const Default: ComponentStoryObj<typeof TimePicker> = {}
