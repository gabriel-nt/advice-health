import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { Sidebar } from './index'
import { Navbar } from '../Navbar'

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Container fluid className="ps-0 pe-0">
          <Navbar />
          {Story()}
        </Container>
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof Sidebar>

export const Default: ComponentStoryObj<typeof Sidebar> = {}
