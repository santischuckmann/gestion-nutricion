import { useParams } from 'react-router'

export const PatientDetail = () => {
  const params = useParams()

  return (
    <div>hola {params.patientId}</div>
  )
}