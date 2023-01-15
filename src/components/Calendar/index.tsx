import clsx from 'clsx'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { getWeekDays } from '../../utils/getWeekDay'

import styles from './styles.module.scss'

interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate?: Date | null
  isBlockPastDates?: boolean
  onDateSelected: (date: Date) => void
}

export function Calendar({
  selectedDate,
  onDateSelected,
  isBlockPastDates = true,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  const shortWeekDays = getWeekDays({
    short: true,
  })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => currentDate.set('date', i + 1))

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => lastDayInCurrentMonth.add(i + 1, 'day'))

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({
        date,
        disabled: true,
      })),
      ...daysInMonthArray.map((date) => ({
        date,
        disabled: isBlockPastDates
          ? date.endOf('day').isBefore(new Date())
          : false,
      })),
      ...nextMonthFillArray.map((date) => ({
        date,
        disabled: true,
      })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, isBlockPastDates])

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const previousMonthDate = currentDate.add(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <p className={styles.calendarTitle}>
          {currentMonth} <span>{currentYear}</span>
        </p>
        <div className={styles.calendarActions}>
          <button
            type="button"
            onClick={handlePreviousMonth}
            title="Previous month"
          >
            <CaretLeft />
          </button>

          <button type="button" onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </div>
      </div>

      <table className={styles.calendarBody}>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <button
                    className={clsx(styles.calendarDay, {
                      'bg-primary bg-opacity-75 text-white':
                        dayjs(selectedDate).toDate().toUTCString() ===
                        date.toDate().toUTCString(),
                    })}
                    type="button"
                    disabled={disabled}
                    onClick={() => onDateSelected(date.toDate())}
                  >
                    {date.get('date')}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
