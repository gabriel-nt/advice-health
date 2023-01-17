import { Col, Container, Row } from 'react-bootstrap'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { LineChart } from './index'

export default {
  title: 'Components/LineChart',
  component: LineChart,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={10}>
            {Story()}
          </Col>
        </Row>
      </Container>
    ),
  ],
} as ComponentMeta<typeof LineChart>

export const Default: ComponentStoryObj<typeof LineChart> = {}
