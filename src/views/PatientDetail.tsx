import { useParams } from 'react-router'
import { useDataFetching } from '../hooks'
import { DetailedPatientDto } from '../shared'
import { DietaryPlanCard } from '../components/DietaryPlan/DietaryPlanCard'
import moment from 'moment'
import { CircularProgress, Typography } from '@mui/material'

export const PatientDetail = () => {
  const params = useParams()
  const patient = useDataFetching<DetailedPatientDto>(`Patient/${params.patientId}`)
  
  const patientInfo = patient.data

  return (
    <div className='flex flex-col gap-8 items-center'>
      {!patient.loading && (
        <>
          <span>Nombre del paciente: {patientInfo?.name} {patientInfo?.surname}</span>
          <span>
          Primera consulta: {moment(patientInfo?.firstAppointmentDate).format('YYYY-MM-DD')}
          </span>
          <span>
          Ultima consulta: {moment(patientInfo?.lastAppointmentDate).format('YYYY-MM-DD')}
          </span>
          {(patientInfo?.dietaryPlans ?? []).length > 0 && patientInfo?.dietaryPlans.map((dietaryPlan) => (
            <DietaryPlanCard dietaryPlan={dietaryPlan} key={`allDietaryPlans-${dietaryPlan.dietaryPlanId}`} />
          ))}
        </>
      )}
      {!patient.loading && patient.data == null && (
        <Typography>Hubo un error al buscar el paciente</Typography>
      )}
      {patient.loading && <CircularProgress />}
    </div>
  )
}