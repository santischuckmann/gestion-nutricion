import { Typography } from '@mui/material'
import { useDataFetching } from '../hooks'
import { PatientDto } from '../shared'
import { PatientCard } from '../components/Patient/PatientCard'

export const Patients = () => {
  const patients = useDataFetching<PatientDto[]>('Patient')

  return (
    <div className='flex flex-col gap-8 items-center'>
      <Typography variant='h4'>Planes creados de todos los pacientes</Typography>
      {patients.data != null && patients.data.map((patient) => (
        <PatientCard patient={patient} key={`allPatients-${patient.patientId}`} />
      ))}
    </div>
  )
}