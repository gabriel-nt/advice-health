import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { Row, Col, Form, Stack, Placeholder } from 'react-bootstrap'

import clsx from 'clsx'
import styles from './styles.module.scss'
import { Calendar } from '../../components/Calendar'
import { TableList } from '../../components/TableList'
import { LineChart } from '../../components/LineChart'
import { DoctorItem } from '../../components/DoctorItem'

import {
  useGetStickyNotesQuery,
  useGetDoctorsWithAppointmentsQuery,
} from '../../graphql/generated'

export function Home() {
  const [skipStickyNotes, setSkipStickyNotes] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { data: doctorsData, loading: isLoadingDoctors } =
    useGetDoctorsWithAppointmentsQuery({
      variables: {
        eventDate: dayjs(selectedDate).format('YYYY-MM-DD'),
      },
    })

  const { data: stickyNotesData, loading: isLoadingStickyNotes } =
    useGetStickyNotesQuery({
      variables: {
        skip: skipStickyNotes,
        initialDate: dayjs(selectedDate).startOf('date').toISOString(),
        finalDate: dayjs(selectedDate).endOf('date').toISOString(),
      },
    })

  const formattedStickyNotes = useMemo(
    () =>
      stickyNotesData?.stickyNotes.map((stickyNote) => ({
        id: stickyNote.id,
        description: stickyNote.description,
        doctorName: stickyNote.doctor?.name,
        patientName: stickyNote.appointment?.patientName,
        createdAt: dayjs(stickyNote.createdAt).format('DD/MM/YYYY[ ]HH:mm'),
      })),
    [stickyNotesData],
  )

  const describedDate = dayjs(selectedDate).format('DD/MM')
  const stickyNotesTotalPages = Math.ceil(
    (stickyNotesData?.stickyNotesConnection.aggregate.count || 0) / 5,
  )

  function handleUpdateSkip(skip: number) {
    setSkipStickyNotes(skip)
  }

  return (
    <Row className="mt-3">
      <Col xs={12} md={8}>
        <Form className={styles.searchBox}>
          <Form.Control type="email" placeholder="Busca" />
          <MagnifyingGlass size={22} />
        </Form>
        <LineChart />

        <div className={clsx('mt-4', styles.tableListContainer)}>
          <TableList
            title="Lembretes"
            isLoading={isLoadingStickyNotes}
            properties={[
              {
                key: 'description',
                label: 'Descrição',
              },
              {
                key: 'doctorName',
                label: 'Médico',
              },
              {
                key: 'patientName',
                label: 'Paciente',
              },
              {
                key: 'createdAt',
                label: 'Data de criação',
              },
            ]}
            pagination={{
              skipNumber: 5,
              totalPages: stickyNotesTotalPages,
              onChangePage: handleUpdateSkip,
            }}
            data={formattedStickyNotes}
          />
        </div>
      </Col>
      <Col
        xs={12}
        md={4}
        className="d-flex flex-column-reverse flex-md-column gap-3 gap-md-0"
      >
        <Calendar
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
          isBlockPastDates={false}
        />
        <div className="p-1 pt-4">
          <h6 className="pb-1">Médicos com consultas no dia {describedDate}</h6>
          <Stack gap={2} className={styles.doctorStack}>
            {!isLoadingDoctors ? (
              <>
                {doctorsData?.doctors.map((doctor) => (
                  <DoctorItem key={doctor.id} doctor={doctor} />
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

            {doctorsData?.doctors.length === 0 && (
              <p>
                Nenhum médico possui consulta marcada para o dia selecionado
              </p>
            )}
          </Stack>
        </div>
      </Col>
    </Row>
  )
}
