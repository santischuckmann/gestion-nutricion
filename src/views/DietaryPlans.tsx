import { Modal, Typography } from '@mui/material'
import { DietaryPlanCard } from '../components/DietaryPlanCard'
import { useDataFetching, useMutate } from '../hooks'
import { DietaryPlanDto, HomeFields, MainCourseType, SnackTime, defaultValues, exampleFields } from '../shared'
import { useState } from 'react'
import { DietaryPlanForm } from '../components/DietaryPlan/DietaryPlanForm'
import { useForm } from '../hooks/useForm'
import { ModalBox } from '../components/ModalBox'

const parseFormToRequest = ({
  dinner,
  lunch,
  afternoonSnack,
  ...data
}: HomeFields, id: number): DietaryPlanDto => {
  return {
    id,
    observations: data.observations || 'Plan sin observaciones',
    name: data.name,
    breakfast: data.breakfast,
    surname: data.surname,
    planSnacks: [ {
      food: afternoonSnack,
      idSnackTime: SnackTime.BreakfastAndLunch
    } ],
    mainCourses: [ {
      idMainCourseType: MainCourseType.Lunch,
      food: lunch,
      dessert: data.lunchDessert
    }, {
      idMainCourseType: MainCourseType.Dinner,
      food: dinner,
      dessert: data.dinnerDessert
    } ]
  }
}

export const DietaryPlans = () => {
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues
  })

  const [ openModal, setOpenModal ] = useState(false)
  const dietaryPlans = useDataFetching<DietaryPlanDto[]>('DietaryPlan')
  const dietaryPlanBeingEdited = useDataFetching<DietaryPlanDto>('DietaryPlan', true)
  const editDietaryPlan = useMutate<DietaryPlanDto>()
    
  const handleOpenEdition = (id: number) => {
    dietaryPlanBeingEdited.fetch(`/${id}`)
    if (dietaryPlanBeingEdited.data != null)
      reset(dietaryPlanBeingEdited.data)
    setOpenModal(true)
  }
  
  const handleConfirmEdition = async (data: HomeFields) => {
    const planId = dietaryPlanBeingEdited?.data?.id ?? 0
    await editDietaryPlan.mutate({ 
      endpoint: 'DietaryPlan',
      method: 'PUT',
      data: parseFormToRequest(data, planId) 
    })
  }

  return (
    <div className='flex flex-col gap-8 items-center'>
      <Typography variant='h4'>Planes creados de todos los pacientes</Typography>
      {dietaryPlans.data != null && dietaryPlans.data.map((plan) => (
        <DietaryPlanCard dietaryPlan={plan} key={plan.name + plan.breakfast} onEdit={handleOpenEdition}/>
      ))}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalBox className='w-1/2 bg-white rounded-sm'>
          <DietaryPlanForm 
            control={control} 
            fields={exampleFields} 
            loading={dietaryPlanBeingEdited.loading}
            onSubmit={handleSubmit(handleConfirmEdition)}
            confirmActionText='Guardar' />
        </ModalBox>
      </Modal>
    </div>
  )
}