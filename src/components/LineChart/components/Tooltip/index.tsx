import { PointTooltipProps } from '@nivo/line'

import styles from './styles.module.scss'

export function Tooltip({ point }: PointTooltipProps) {
  return (
    <div className={styles.tooltipContainer}>
      <div>
        <svg width="12" height="12">
          <rect
            width="10px"
            height="10px"
            fill={point.serieColor}
            rx="2"
            ry="2"
          />
        </svg>
        <div>
          <span>{point.data.xFormatted}: </span>
          <span className="subTitle">{point.data.y.toString()}%</span>
        </div>
      </div>
    </div>
  )
}
