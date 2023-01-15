import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Row, Col, Stack, Placeholder } from 'react-bootstrap'

import styles from './styles.module.scss'
import { Calendar } from '../../components/Calendar'
import { DoctorItem } from '../../components/DoctorItem'
import { ScheduleItem } from './components/ScheduleItem'
import { DoctorTooltip } from './components/DoctorTooltip'
import { possibleTimesInMinutes } from '../../utils/getPossibleTimeInMinutes'

import {
  useGetDoctorsQuery,
  useGetAppointmentsByDoctorQuery,
} from '../../graphql/generated'

interface Doctor {
  id: string
  name: string
  bio: string
  avatarURL: string
}

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const {
    client,
    refetch,
    data: appointmentsData,
  } = useGetAppointmentsByDoctorQuery({
    variables: {
      eventDate: dayjs(selectedDate).format('YYYY-MM-DD'),
      doctorId: selectedDoctor?.id,
    },
  })

  const { data: doctorsData, loading: isLoadingDoctors } = useGetDoctorsQuery()

  const describedDate = dayjs(selectedDate).format('DD[/]MMM[ ]YYYY')

  function handleSelectDoctor(doctor: Doctor) {
    setSelectedDoctor(doctor)
  }

  function handleUpdateOrDeleteAppointment() {
    refetch()
    client.resetStore()
  }

  useEffect(() => {
    if (doctorsData && doctorsData.doctors.length > 0) {
      setSelectedDoctor(doctorsData.doctors[0])
    }
  }, [doctorsData])

  return (
    <Row>
      <Col xs={12} md={12} lg={4}>
        <Row className="p-1 pt-4">
          <Col xs={12} sm={5} md={6} lg={12}>
            <div className="d-flex align-items-center pb-2">
              <h6 className="m-0">Médicos</h6>
              <DoctorTooltip />
            </div>
            <Stack gap={2} className={styles.doctorStack}>
              {!isLoadingDoctors ? (
                <>
                  {doctorsData?.doctors.map((doctor) => (
                    <DoctorItem
                      key={doctor.id}
                      doctor={doctor}
                      onSelectDoctor={handleSelectDoctor}
                      isSelected={selectedDoctor?.id === doctor.id}
                    />
                  ))}
                </>
              ) : (
                <>
                  {Array.from({
                    length: 6,
                  }).map(() => (
                    <Placeholder as="div" animation="glow" key={Math.random()}>
                      <Placeholder xs={12} className="pt-5" />
                    </Placeholder>
                  ))}
                </>
              )}
            </Stack>
          </Col>

          <Col xs={12} sm={7} md={6} lg={12}>
            <div className="mt-4">
              <Calendar
                isBlockPastDates={false}
                selectedDate={selectedDate}
                onDateSelected={setSelectedDate}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={12} lg={8}>
        <div className="p-1 pt-4">
          <h6 className="pb-1">{describedDate}</h6>
          <Stack gap={2} className={styles.appointmentsStack}>
            {possibleTimesInMinutes.map(({ disabled, startTimeInMinutes }) => {
              const appointmentData = appointmentsData?.appointments.find(
                (item) => item.startTimeInMinutes === startTimeInMinutes,
              )

              return (
                <ScheduleItem
                  disabled={disabled}
                  schedule={{
                    targetDate: selectedDate,
                    targetDoctorId: selectedDoctor?.id,
                  }}
                  data={appointmentData}
                  key={startTimeInMinutes}
                  startTimeInMinutes={startTimeInMinutes}
                  onUpdateOrDelete={handleUpdateOrDeleteAppointment}
                />
              )
            })}
          </Stack>
        </div>
      </Col>
    </Row>
  )
}
