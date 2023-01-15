import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

import styles from './styles.module.scss'
import { possibleTimesInMinutes } from '../../utils/getPossibleTimeInMinutes'

interface TimePickerProps {
  onTimeSelected: (time: number) => void
}

export function TimePicker({ onTimeSelected }: TimePickerProps) {
  return (
    <div className="ml-3">
      <Row className="gap-2 gx-0">
        {possibleTimesInMinutes.map((time) => (
          <Col
            as="button"
            xs={3}
            onClick={() => onTimeSelected(time.startTimeInMinutes)}
            className={styles.timePickerItem}
            key={time.startTimeInMinutes}
          >
            {dayjs.duration(time.startTimeInMinutes, 'minutes').format('HH:mm')}
          </Col>
        ))}
      </Row>
    </div>
  )
}
