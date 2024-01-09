import { Button } from '@mui/material'
import { PatientDto } from '../../shared'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export const PatientCard = ({
  patient,
}: { patient: PatientDto }) => {
  const navigate = useNavigate()

  return (
    <div className='flex gap-2 flex-col items-center border-emerald-400 border-2 rounded-lg w-max p-4'>
      <span>Nombre del paciente: {patient.name} {patient.surname}</span>
      <span>
        Primera consulta: {moment(patient.firstAppointmentDate).format('YYYY-MM-DD')}
      </span>
      <span>
        Ultima consulta: {moment(patient.lastAppointmentDate).format('YYYY-MM-DD')}
      </span>
      <Button color="primary" onClick={() => navigate(`patient/${patient.patientId}`)}>Ver todos los planes</Button>
    </div>
  )
}