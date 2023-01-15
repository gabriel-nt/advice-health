import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { CaretLeft, CaretRight } from 'phosphor-react'

import styles from './styles.module.scss'

interface PaginationProps {
  totalPages: number
  skipNumber: number
  onChangePage: (skip: number) => void
}

export function Pagination({
  totalPages,
  skipNumber,
  onChangePage,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(0)

  function handleNextPage(currentPage: number) {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1)
      onChangePage(currentPage + 1 * skipNumber)
    }
  }

  function handlePrevPage(currentPage: number) {
    if (currentPage - 1 > 0) {
      setCurrentPage(currentPage - 1)
      onChangePage(currentPage - 1 * skipNumber)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-end w-100">
      <small className="me-3">
        {currentPage + 1} de {totalPages} página(s)
      </small>

      <div className={styles.paginationActions}>
        <Button
          title="Previous page"
          className="p-0 m-0 bg-white border-0"
          onClick={() => handlePrevPage(currentPage)}
        >
          <CaretLeft />
        </Button>

        <Button
          title="Next page"
          className="p-0 m-0 bg-white border-0"
          onClick={() => handleNextPage(currentPage)}
        >
          <CaretRight />
        </Button>
      </div>
    </div>
  )
}
