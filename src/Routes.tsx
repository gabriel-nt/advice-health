import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Schedule } from './pages/Schedule'
import { Appointment } from './pages/Appointment'
import { Appointments } from './pages/Appointments'
import { CreateAppointment } from './pages/CreateAppointment'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agenda" element={<Schedule />} />
      <Route path="/consultas" element={<Appointments />} />
      <Route path="/consultas/:id" element={<Appointment />} />
      <Route path="/criar-agendamento" element={<CreateAppointment />} />
    </Routes>
  )
}
