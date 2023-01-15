import dayjs from 'dayjs'
import { ResponsiveLine } from '@nivo/line'

import { data } from './mock'
import styles from './styles.module.scss'

import { Tooltip } from './components/Tooltip'
import { Legends } from './components/Legends'

export function LineChart() {
  return (
    <div className={styles.boxContainer}>
      <h4>Porcentagem das consultas de 2022</h4>
      <hr />
      <div className={styles.nivoWrapper}>
        <div>
          <ResponsiveLine
            data={data}
            xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              useUTC: false,
              precision: 'month',
            }}
            yScale={{
              type: 'linear',
              stacked: false,
            }}
            xFormat={(value) => dayjs(value).format('MMM')}
            enableGridX={false}
            margin={{
              top: 50,
              right: 20,
              left: 50,
              bottom: 30,
            }}
            colors={['#009859', '#B20018']}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderColor={{ from: 'serieColor' }}
            pointSize={10}
            pointLabelYOffset={-12}
            enablePoints
            enablePointLabel
            tooltip={Tooltip}
            pointLabel={(t) => `${t.y}%`}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 8,
              format(value) {
                return dayjs(value).format('MMM')
              },
              tickRotation: 0,
              legendPosition: 'middle',
            }}
            isInteractive
            useMesh
            axisLeft={{
              tickSize: 0,
              tickPadding: 16,
              tickRotation: 0,
              format: (value) => `${value}%`,
              legendPosition: 'middle',
            }}
            theme={{
              fontFamily: 'Roboto',
              textColor: '#000',
              fontSize: 12,
              labels: {
                text: {
                  fontSize: 12,
                  fontWeight: 500,
                },
              },
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '20px',
                  },
                },
              },
            }}
            legends={[]}
          />
        </div>
      </div>
      <Legends />
    </div>
  )
}
