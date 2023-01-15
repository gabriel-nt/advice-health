import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { Placeholder, Spinner, Table } from 'react-bootstrap'

import styles from './styles.module.scss'
import { Pagination } from './components/Pagination'

interface TableListProps<
  ObjectType extends {
    id: string
  },
> {
  title?: string
  data?: ObjectType[]
  isLoading?: boolean
  properties: {
    label: string
    key: keyof ObjectType | string
  }[]
  pagination: {
    totalPages: number
    skipNumber: number
    onChangePage: (page: number) => void
  }
}

export function TableList<
  ObjectType extends {
    id: string
  },
>({
  title,
  data,
  properties,
  pagination,
  isLoading = false,
}: PropsWithChildren<TableListProps<ObjectType>>) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-2">
        {title && <h5 className="mb-0">{title}</h5>}

        {isLoading && (
          <Spinner
            size="sm"
            animation="border"
            variant="primary"
            className="mx-2"
            role="status"
          >
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        )}
      </div>

      <div className={clsx(styles.tableList, 'mb-2 mb-md-0')}>
        <Table responsive="sm">
          <thead>
            <tr>
              {properties.map((property) => (
                <th key={String(property.key)}>{property.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {Array.from({
                  length: pagination.skipNumber,
                }).map(() => (
                  <tr key={Math.random()}>
                    {properties.map((property) => (
                      <td key={String(property.key)}>
                        <Placeholder as="p" animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <>
                {data?.map((item) => (
                  <tr key={item.id}>
                    {properties.map((property) => (
                      <td key={String(property.key)}>
                        {item[String(property.key)] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}

            {data?.length === 0 && (
              <tr>
                <td colSpan={properties.length} className="text-center">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {pagination.totalPages > 0 && (
        <Pagination
          skipNumber={pagination.skipNumber}
          totalPages={pagination.totalPages}
          onChangePage={pagination.onChangePage}
        />
      )}
    </div>
  )
}
