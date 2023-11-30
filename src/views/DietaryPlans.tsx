import { Typography } from '@mui/material'
import { DietaryPlanCard } from '../components/DietaryPlanCard'
import { useDataFetching } from '../hooks'
import { DietaryPlanDto } from '../shared'

export const DietaryPlans = () => {
  const dietaryPlans = useDataFetching<DietaryPlanDto[]>('DietaryPlan')  

  return (
    <div className='flex flex-col gap-8 items-center'>
      <Typography variant='h4'>Planes creados de todos los pacientes</Typography>
      {dietaryPlans.data != null && dietaryPlans.data.map((plan) => (
        <DietaryPlanCard dietaryPlan={plan} key={plan.name + plan.breakfast}/>
      ))}
    </div>
  )
}