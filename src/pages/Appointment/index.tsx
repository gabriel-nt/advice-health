import dayjs from 'dayjs'
import * as yup from 'yup'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { CalendarCheck, Trash, UserCirclePlus } from 'phosphor-react'

import {
  useGetAppointmentByIdQuery,
  useGetDoctorsQuery,
  useUpdateAppointmentMutation,
} from '../../graphql/generated'

import styles from './styles.module.scss'
import { cpfMask } from '../../utils/cpfMask'
import { moneyMask } from '../../utils/moneyMask'
import { phoneMask } from '../../utils/phoneMask'
import { useToast } from '../../contexts/ToastContext'
import { InputField } from '../../components/InputField'
import { getMoneyInCents } from '../../utils/getMoneyInCents'
import { SelectEventDateModal } from '../../components/SelectEventDateModal'
import { DeleteAppointmentModal } from '../../components/DeleteAppointmentModal'

const updateAppointmentSchema = yup.object({
  eventDate: yup.date().required(),
  doctorId: yup.string().required(),
  startTimeInMinutes: yup.number().min(480, 'Campo obrigatório').required(),
  paymentMethod: yup.string().oneOf(['creditCard', 'cash']).required(),
  billingAmount: yup.string().required(),
  description: yup.string().optional(),
  patientName: yup.string().required(),
  patientBirthday: yup.string().required(),
  patientDocument: yup.string().required(),
  patientEmail: yup.string().email().required(),
  patientPhone: yup.string().required(),
  patientAddress: yup.string().required(),
})

type UpdateAppointmentData = yup.InferType<typeof updateAppointmentSchema>

interface SelectAppointmentDateData {
  eventDate: Date
  startTimeInMinutes: number
}

export function Appointment() {
  const { id } = useParams<{
    id: string
  }>()

  const navigate = useNavigate()
  const { addToast } = useToast()

  const [updateAppointment] = useUpdateAppointmentMutation()
  const { data: appointmentData } = useGetAppointmentByIdQuery({
    variables: {
      id,
    },
  })

  const { data: doctorsData, loading: isLoadingDoctors } = useGetDoctorsQuery()

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenSelectDateModal, setIsOpenSelectDateModal] = useState(false)

  const useFormMethods = useForm<UpdateAppointmentData>({
    defaultValues: {
      eventDate: new Date(),
      startTimeInMinutes: 0,
      paymentMethod: 'creditCard',
      billingAmount: '',
    },
    resolver: yupResolver(updateAppointmentSchema),
  })

  const {
    watch,
    register,
    setValue,
    reset,
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
      setValue('patientPhone', e.target.value)
    },
    [setValue],
  )

  const handleChangePatientDocument = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = cpfMask(e.target.value)
      setValue('patientDocument', e.target.value)
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

  const handleShowModal = () => setIsOpenSelectDateModal(true)
  const handleCloseModal = () => setIsOpenSelectDateModal(false)

  const handleShowDeleteModal = () => setIsOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false)

  const handleDeleteAppointment = useCallback(() => {
    navigate('/consultas')
  }, [navigate])

  const handleUpdateAppointment = useCallback(
    async ({
      doctorId,
      eventDate,
      description,
      billingAmount,
      paymentMethod,
      startTimeInMinutes,
      patientAddress,
      patientName,
      patientDocument,
      patientEmail,
      patientPhone,
    }: UpdateAppointmentData) => {
      try {
        await updateAppointment({
          variables: {
            id,
            doctorId,
            description,
            paymentMethod,
            patientAddress,
            startTimeInMinutes,
            patientName,
            patientEmail,
            patientPhone,
            patientDocument,
            eventDate: dayjs(eventDate).toDate(),
            endTimeInMinutes: startTimeInMinutes + 30,
            billingAmount: getMoneyInCents(billingAmount),
          },
        })

        addToast({
          type: 'primary',
          title: `Consulta atualizada com sucesso`,
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
    [addToast, navigate, updateAppointment, id],
  )

  useEffect(() => {
    if (appointmentData && appointmentData.appointment) {
      const { appointment } = appointmentData

      reset({
        ...appointment,
        doctorId: appointment.doctor?.id || '',
        description: appointment.description || '',
        patientPhone: phoneMask(appointment.patientPhone),
        patientBirthday: dayjs(appointment.patientBirthday).format(
          'DD/MM/YYYY',
        ),
        patientDocument: cpfMask(appointment.patientDocument),
        billingAmount: moneyMask(
          String((appointment.billingAmount * 100) / 60),
        ),
      })
    }
  }, [appointmentData, reset])

  return (
    <FormProvider {...useFormMethods}>
      <Row
        as={Form}
        onSubmit={handleSubmit(handleUpdateAppointment)}
        className="pe-2 ps-2 justify-content-center pt-4 gap-3"
      >
        <Col sm={12} md={10} lg={8} className={styles.box}>
          <Trash
            size={26}
            className={styles.excludeIcon}
            onClick={handleShowDeleteModal}
          />

          <div className="d-flex gap-2 pb-4">
            <CalendarCheck size={24} />

            <div>
              <h5 className="mb-0">Dados da Consulta</h5>
              <p>Informações da consulta</p>
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
                  name="billingAmount"
                  placeholder="Valor de cobrança"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeBillingAmount(e)
                  }
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
              <p>As principais infos do cliente</p>
            </div>
          </div>

          <Form>
            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={8}>
                <InputField
                  placeholder="Nome"
                  name="patientName"
                  errorMessage={errors.patientName?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4}>
                <InputField
                  disabled
                  maxLength={10}
                  name="patientBirthday"
                  placeholder="Aniversário"
                  errorMessage={errors.patientBirthday?.message}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={4}>
                <InputField
                  maxLength={14}
                  placeholder="Documento"
                  name="patientDocument"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangePatientDocument(e)
                  }
                  errorMessage={errors.patientDocument?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4}>
                <InputField
                  type="email"
                  placeholder="Email"
                  name="patientEmail"
                  errorMessage={errors.patientEmail?.message}
                />
              </Form.Group>

              <Form.Group as={Col} sm={4}>
                <InputField
                  maxLength={15}
                  placeholder="Telefone"
                  name="patientPhone"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangePatientPhone(e)
                  }
                  errorMessage={errors.patientPhone?.message}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 g-2">
              <Form.Group as={Col} sm={12}>
                <InputField
                  as="textarea"
                  {...register('patientAddress')}
                  placeholder="Endereço do paciente"
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
            onClick={() => navigate(-1)}
          >
            cancelar
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="text-white"
            disabled={isSubmitting}
          >
            atualizar
          </Button>
        </Col>

        {doctorId && (
          <SelectEventDateModal
            doctorId={doctorId}
            isOpen={isOpenSelectDateModal}
            onCloseModal={handleCloseModal}
            onSuccessModal={handleChangeAppointmentDate}
          />
        )}
      </Row>

      <DeleteAppointmentModal
        appointment={{
          id,
          doctorId,
        }}
        isOpen={isOpenDeleteModal}
        onCloseModal={handleCloseDeleteModal}
        onSuccessModal={handleDeleteAppointment}
      />
    </FormProvider>
  )
}
