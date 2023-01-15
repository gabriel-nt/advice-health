import styles from './styles.module.scss'

export function Legends() {
  return (
    <div className={styles.legendsContainer}>
      <div>
        <svg width="12" height="12">
          <rect width="12px" height="12px" fill="#009859" rx="2" ry="2" />
        </svg>
        <p>Realizadas</p>
      </div>

      <div>
        <svg width="12" height="12">
          <rect width="12px" height="12px" fill="#B20018" rx="2" ry="2" />
        </svg>
        <p>Canceladas</p>
      </div>
    </div>
  )
}
