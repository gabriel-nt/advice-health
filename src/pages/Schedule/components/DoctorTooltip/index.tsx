import { Info } from 'phosphor-react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export function DoctorTooltip() {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="tooltip">
          <span>
            Selecione um médico e verifique sua disponibilidade conforme a data
            escolhida
          </span>
        </Tooltip>
      }
    >
      <Info size={22} className="ms-2" />
    </OverlayTrigger>
  )
}
