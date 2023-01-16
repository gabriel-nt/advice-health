import * as yup from 'yup'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CalendarCheck, MapPinLine, UserCirclePlus } from 'phosphor-react'

import {
  useCreateAppointmentMutation,
  useGetDoctorsQuery,
} from '../../graphql/generated'

import styles from './styles.module.scss'
import { cpfMask } from '../../utils/cpfMask'
import { dateMask } from '../../utils/dateMask'
import { phoneMask } from '../../utils/phoneMask'
import { moneyMask } from '../../utils/moneyMask'
import { zipCodeMask } from '../../utils/zipCodeMask'
import { useToast } from '../../contexts/ToastContext'
import { validateCPF } from '../../utils/cpfValidator'
import { InputField } from '../../components/InputField'
import { getMoneyInCents } from '../../utils/getMoneyInCents'
import { getDateUsLocale } from '../../utils/getDateUsLocale'
import { SelectEventDateModal } from '../../components/SelectEventDateModal'

const createAppointmentSchema = yup.object({
  eventDate: yup.date().required(),
  doctorId: yup.string().required(),
  startTimeInMinutes: yup.number().min(480, 'Campo obrigatório').required(),
  paymentMethod: yup.string().oneOf(['creditCard', 'cash']).required(),
  billingAmount: yup.string().required(),
  description: yup.string(),
  patient: yup.object({
    name: yup.string().required(),
    birthday: yup.date().required(),
    document: yup
      .string()
      .test('invalid document', 'CPF inválido', (value) =>
        value ? validateCPF(value) : false,
      )
      .required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
  }),
  patientAddress: yup.object({
    zipCode: yup.string().min(9, 'CEP incompleto').required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().optional(),
    neighborhood: yup.string().required(),
    city: yup.string().required(),
    unitFederative: yup.string().min(2, 'UF inválida').max(2).required(),
  }),
})

type CreateAppointmentData = yup.InferType<typeof createAppointmentSchema>

interface RouterState {
  eventDate: Date
  doctorId: string
  startTimeInMinutes: number
}

interface SelectAppointmentDateData {
  eventDate: Date
  startTimeInMinutes: number
}

export function CreateAppointment() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [createAppointment] = useCreateAppointmentMutation()

  const { data: doctorsData, loading: isLoadingDoctors } = useGetDoctorsQuery()

  const location = useLocation()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const defaultState: RouterState = useMemo(
    () => location.state || {},
    [location],
  )

  const useFormMethods = useForm<CreateAppointmentData>({
    defaultValues: {
      eventDate: defaultState.eventDate && new Date(defaultState.eventDate),
      startTimeInMinutes: defaultState.startTimeInMinutes || 0,
      doctorId: defaultState.doctorId || '',
      paymentMethod: 'creditCard',
      billingAmount: '',
    },
    resolver: yupResolver(createAppointmentSchema),
  })

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormMethods

  const doctorId = watch('doctorId')

  const eventDate = watch('eventDate')
  const startTimeInMinutes = watch('startTimeInMinutes')

  const describedEventDate = eventDate
    ? dayjs(eventDate).format('DD/MM/YYYY')
    : ''

  const describedStartTime = startTimeInMinutes
    ? dayjs.duration(startTimeInMinutes, 'minutes').format('HH:mm')
    : ''

  const handleChangePatientPhone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = phoneMask(e.target.value)
      setValue('patient.phone', e.target.value)
    },
    [setValue],
  )

  const handleChangePatientDocument = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = cpfMask(e.target.value)
      setValue('patient.document', e.target.value)
    },
    [setValue],
  )

  const handleChangePatientBirthday = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = dayjs(getDateUsLocale(e.target.value)).startOf('date')

      if (dayjs(newDate).isValid()) {
        setValue('patient.birthday', newDate.toDate())
        e.target.value = dateMask(e.target.value)
      }
    },
    [setValue],
  )

  const handleChangeZipCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = zipCodeMask(e.target.value)
      setValue('patientAddress.zipCode', e.target.value)
    },
    [setValue],
  )

  const handleChangeBillingAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = moneyMask(e.target.value)
      setValue('billingAmount', e.target.value)
    },
    [setValue],
  )

  const handleChangeAppointmentDate = useCallback(
    ({
      eventDate: newEventDate,
      startTimeInMinutes,
    }: SelectAppointmentDateData) => {
      setValue('eventDate', newEventDate)
      setValue('startTimeInMinutes', startTimeInMinutes)
    },
    [setValue],
  )

  const handleShowModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCancel = useCallback(() => {
    navigate('/agendamentos')
  }, [navigate])

  const handleCreateAppointment = useCallback(
    async ({
      patient,
      doctorId,
      eventDate,
      description,
      billingAmount,
      paymentMethod,
      startTimeInMinutes,
      patientAddress: {
        city,
        number,
        street,
        zipCode,
        complement,
        neighborhood,
        unitFederative,
      },
    }: CreateAppointmentData) => {
      try {
        const patientAddress = `${street}, ${number}, Bairro: ${neighborhood}, Complemento: ${complement}, CEP: ${zipCode}, ${city}/${unitFederative}`

        await createAppointment({
          variables: {
            doctorId,
            description,
            paymentMethod,
            patientAddress,
            startTimeInMinutes,
            patientName: patient.name,
            patientEmail: patient.email,
            patientPhone: patient.phone,
            patientDocument: patient.document,
            patientBirthday: patient.birthday,
            eventDate: dayjs(eventDate).toDate(),
            endTimeInMinutes: startTimeInMinutes + 30,
            billingAmount: getMoneyInCents(billingAmount),
          },
        })

        addToast({
          type: 'primary',
          title: `Consulta criada com sucesso`,
          description: 'Vc será redirecionado para a tela de consultas.',
        })

        navigate('/consultas')
      } catch (error) {
        addToast({
          type: 'danger',
          title: 'Opps, ocorreu um erro!',
          description: 'Tente novamente em alguns instantes.',
        })
      }
    },
    [addToast, navigate, createAppointment],
  )

  useEffect(() => {
    if (doctorsData && doctorsData.doctors.length > 0) {
      if (defaultState.doctorId) {
        setValue('doctorId', defaultState.doctorId)
      } else {
        setValue('doctorId', doctorsData.doctors[0].id)
      }
    }
  }, [doctorsData, setValue, defaultState])

  return (
    <FormProvider {...useFormMethods}>
      <Row
        as={Form}
        onSubmit={handleSubmit(handleCreateAppointment)}
        className="pe-2 ps-2 justify-content-center pt-4 gap-3"
      >
        <Col sm={12} md={10} lg={8} className={styles.box}>
          <div className="d-flex gap-2 pb-4">
            <CalendarCheck size={24} />

            <div>
              <h5 className="mb-0">Dados da Consulta</h5>
              <p>Preencha as informações para marcar a consulta</p>
            </div>
          </div>

          <Form>
            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={4}>
                <Form.Select
                  aria-label="Médico"
                  value={doctorId}
                  disabled={isLoadingDoctors}
                  onChange={(e) => setValue('doctorId', e.target.value)}
                >
                  {doctorsData?.doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} sm={4} onClick={handleShowModal}>
                <InputField
                  name="date"
                  placeholder="Data"
                  value={describedEventDate}
                  errorMessage={errors.eventDate?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4} onClick={handleShowModal}>
                <InputField
                  placeholder="Horário"
                  name="startTime"
                  value={describedStartTime}
                  errorMessage={errors.startTimeInMinutes?.message}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 g-2">
              <Form.Group as={Col} xs={6} sm={6}>
                <Form.Select
                  aria-label="Método de Pagamento"
                  onChange={(e) => setValue('paymentMethod', e.target.value)}
                >
                  <option value="creditCard">Cartão de Crédito</option>
                  <option value="cash">Dinheiro</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} xs={6} sm={6}>
                <InputField
                  useInternalRegister={false}
                  placeholder="Valor de cobrança"
                  {...register('billingAmount', {
                    onChange: (e) => handleChangeBillingAmount(e),
                  })}
                  errorMessage={errors.billingAmount?.message}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={12}>
                <InputField
                  as="textarea"
                  name="description"
                  placeholder="Descrição"
                />
              </Form.Group>
            </Row>
          </Form>
        </Col>

        <Col sm={12} md={10} lg={8} className={styles.box}>
          <div className="d-flex gap-2 pb-4">
            <UserCirclePlus size={24} />

            <div>
              <h5 className="mb-0">Dados de Paciente</h5>
              <p>Informe as principais infos do cliente</p>
            </div>
          </div>

          <Form>
            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={8}>
                <InputField
                  placeholder="Nome"
                  name="patient.name"
                  errorMessage={errors.patient?.name?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4}>
                <InputField
                  maxLength={10}
                  placeholder="Aniversário"
                  useInternalRegister={false}
                  {...register('patient.birthday', {
                    onChange: (e) => handleChangePatientBirthday(e),
                  })}
                  errorMessage={errors.patient?.birthday?.message}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={4}>
                <InputField
                  maxLength={14}
                  placeholder="Documento"
                  useInternalRegister={false}
                  errorMessage={errors.patient?.document?.message}
                  {...register('patient.document', {
                    onChange: (e) => handleChangePatientDocument(e),
                  })}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4}>
                <InputField
                  type="email"
                  placeholder="Email"
                  name="patient.email"
                  errorMessage={errors.patient?.email?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4}>
                <InputField
                  maxLength={15}
                  placeholder="Telefone"
                  useInternalRegister={false}
                  {...register('patient.phone', {
                    onChange: (e) => handleChangePatientPhone(e),
                  })}
                  errorMessage={errors.patient?.phone?.message}
                />
              </Form.Group>
            </Row>
          </Form>
        </Col>

        <Col sm={12} md={10} lg={8} className={styles.box}>
          <div className="d-flex gap-2 pb-4">
            <MapPinLine size={24} />

            <div>
              <h5 className="mb-0">Endereço de Paciente</h5>
              <p>Informe o endereço do cliente</p>
            </div>
          </div>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} sm={3}>
                <InputField
                  maxLength={9}
                  placeholder="CEP"
                  useInternalRegister={false}
                  {...register('patientAddress.zipCode', {
                    onChange: (e) => handleChangeZipCode(e),
                  })}
                  errorMessage={errors.patientAddress?.zipCode?.message}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <InputField
                  placeholder="Rua"
                  name="patientAddress.street"
                  errorMessage={errors.patientAddress?.street?.message}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={4}>
                <InputField
                  placeholder="Número"
                  name="patientAddress.number"
                  errorMessage={errors.patientAddress?.number?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={8}>
                <InputField
                  placeholder="Complemento"
                  name="patientAddress.complement"
                  errorMessage={errors.patientAddress?.complement?.message}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 g-2">
              <Form.Group as={Col} xs={12} sm={5}>
                <InputField
                  placeholder="Bairro"
                  name="patientAddress.neighborhood"
                  errorMessage={errors.patientAddress?.neighborhood?.message}
                />
              </Form.Group>

              <Form.Group as={Col} xs={8} sm={5}>
                <InputField
                  placeholder="Cidade"
                  name="patientAddress.city"
                  errorMessage={errors.patientAddress?.city?.message}
                />
              </Form.Group>

              <Form.Group as={Col} xs={4} sm={2}>
                <InputField
                  maxLength={2}
                  placeholder="UF"
                  name="patientAddress.unitFederative"
                  errorMessage={errors.patientAddress?.unitFederative?.message}
                />
              </Form.Group>
            </Row>
          </Form>
        </Col>

        <Col
          sm={12}
          md={10}
          lg={8}
          className="d-flex gap-2 p-0 mt-2 justify-content-end"
        >
          <Button
            type="button"
            variant="outline-primary"
            onClick={handleCancel}
          >
            cancelar
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="text-white"
            disabled={isSubmitting}
          >
            agendar
          </Button>
        </Col>

        {doctorId && (
          <SelectEventDateModal
            doctorId={doctorId}
            isOpen={isOpenModal}
            onCloseModal={handleCloseModal}
            onSuccessModal={handleChangeAppointmentDate}
          />
        )}
      </Row>
    </FormProvider>
  )
}
