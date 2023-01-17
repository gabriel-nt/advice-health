import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { Navbar } from './index'

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Navbar>

export const Default: ComponentStoryObj<typeof Navbar> = {}
