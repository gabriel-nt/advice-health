import clsx from 'clsx'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Funnel, MagnifyingGlass, PencilSimple, X } from 'phosphor-react'

import styles from './styles.module.scss'
import { TableList } from '../../components/TableList'
import { useGetAppointmentsQuery } from '../../graphql/generated'

enum PaymentMethodEnum {
  cash = 'Dinheiro',
  creditCard = 'Cartão de Crédito',
}

export function Appointments() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [auxSearch, setAuxSearch] = useState('')
  const [skipAppointmentsList, setSkipAppointmentsList] = useState(0)

  const {
    data,
    loading: isLoading,
    client,
  } = useGetAppointmentsQuery({
    variables: {
      search,
      skip: skipAppointmentsList,
    },
  })

  const formattedAppointments = useMemo(
    () =>
      data?.appointments.map(
        ({
          id,
          billingAmount,
          doctor,
          eventDate,
          patientName,
          paymentMethod,
          startTimeInMinutes,
        }) => ({
          id,
          billingAmount: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(billingAmount ? billingAmount / 60 : 0),
          patientName,
          paymentMethod: paymentMethod && PaymentMethodEnum[paymentMethod],
          doctorName: doctor?.name,
          eventDate: `${dayjs(eventDate).format('DD/MM/YYYY')} às ${dayjs
            .duration(startTimeInMinutes, 'minutes')
            .format('HH:mm')}`,
          enableEditIcon: (
            <Button
              className="p-0 m-0 bg-white border-0"
              title="Edit appointment"
              onClick={() => navigate(`/consultas/${id}`)}
            >
              <PencilSimple size={20} className={styles.icon} />
            </Button>
          ),
          enableViewIcon: (
            <Button
              className="p-0 m-0 bg-white border-0"
              title="See more appointment"
              onClick={() => navigate(`/consultas/${id}`)}
            >
              <MagnifyingGlass size={20} className={styles.icon} />
            </Button>
          ),
        }),
      ),
    [data, navigate],
  )

  const appointmentsTotalPages = Math.ceil(
    (data?.appointmentsConnection.aggregate.count || 0) / 20,
  )

  function handleUpdateSkip(skip: number) {
    setSkipAppointmentsList(skip)
  }

  function handleSearchAppointment(e: FormEvent) {
    e.preventDefault()
    setSearch(auxSearch)
    setSkipAppointmentsList(0)
  }

  function handleClearSearch() {
    setSearch('')
    setAuxSearch('')
    setSkipAppointmentsList(0)
  }

  useEffect(() => {
    client.resetStore()
  }, [client])

  return (
    <>
      <Row className="mt-3 mb-4 mb-md-5 align-items-center justify-content-between">
        <Col xs={12} md={4}>
          <Form className={styles.searchBox} onSubmit={handleSearchAppointment}>
            <Form.Control
              type="text"
              value={auxSearch}
              placeholder="Busca"
              onChange={(e) => setAuxSearch(e.target.value)}
            />
            <Button
              className="p-0 m-0 bg-white border-0"
              title="Search"
              type="submit"
            >
              {search && isLoading ? (
                <Spinner
                  size="sm"
                  animation="border"
                  variant="primary"
                  className="mx-1"
                  role="status"
                  style={{
                    marginTop: 4,
                  }}
                >
                  <span className="visually-hidden">Carregando...</span>
                </Spinner>
              ) : (
                <>
                  {search ? (
                    <X
                      size={22}
                      className={clsx(styles.icon, 'text-danger')}
                      onClick={handleClearSearch}
                    />
                  ) : (
                    <MagnifyingGlass size={22} className={styles.icon} />
                  )}
                </>
              )}
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-end">
          <Row className="flex-nowrap mt-3 mt-md-0" role="button">
            <Funnel
              size={22}
              className={styles.icon}
              data-role="button"
              weight="fill"
            />
            <span className="ps-0 w-auto">Filtros avançados</span>
          </Row>
        </Col>
      </Row>

      <Row>
        <TableList
          isLoading={isLoading}
          properties={[
            {
              key: 'patientName',
              label: 'Paciente',
            },
            {
              key: 'doctorName',
              label: 'Médico',
            },
            {
              key: 'paymentMethod',
              label: 'Forma de pagamento',
            },
            {
              key: 'billingAmount',
              label: 'Valor',
            },
            {
              key: 'eventDate',
              label: 'Data',
            },
            {
              key: 'enableEditIcon',
              label: '',
            },
            {
              key: 'enableViewIcon',
              label: '',
            },
          ]}
          pagination={{
            skipNumber: 20,
            totalPages: appointmentsTotalPages,
            onChangePage: handleUpdateSkip,
          }}
          data={formattedAppointments}
        />
      </Row>
    </>
  )
}
