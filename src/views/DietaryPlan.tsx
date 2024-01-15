import { useForm } from '../hooks/useForm'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useMutate } from '../hooks'
import { DietaryPlanInsertionDto, SnackTime, MainCourseType, exampleFields, HomeFields, defaultValues } from '../shared'
import { DietaryPlanForm } from '../components/DietaryPlan/DietaryPlanForm'

const parseFormToRequest = ({
  dinner,
  lunch,
  afternoonSnack,
  ...data
}: HomeFields): DietaryPlanInsertionDto => {
  const patientFields = data.patientId == 0 ? {
    patientId: null,
    name: data.name,
    surname: data.surname,
  } : {
    patientId: data.patientId,
    name: '',
    surname: ''
  }

  return {
    ...patientFields,
    observations: data.observations || 'Plan sin observaciones',
    breakfast: data.breakfast,
    planSnacks: [ {
      food: afternoonSnack,
      idSnackTime: SnackTime.AfternoonSnack
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

export const DietaryPlan = () => {
  const createDietaryPlan = useMutate<{ id: number}>()
  const [ justCreated, setJustCreated ] = useState(false)
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues
  })

  const onSubmit = async (data: HomeFields) => {
    await createDietaryPlan.mutate({ 
      endpoint: 'DietaryPlant', 
      method: 'POST',
      data: parseFormToRequest(data) 
    })

    console.log({ createDietaryPlan })

    if (!createDietaryPlan.error)
      setJustCreated(true)
  }

  const handleRestart = () => {
    setJustCreated(false)
    reset()
  }

  return (
    <div className="flex flex-col gap-2 p-4 items-center">
      <Typography variant='h4'>Crea un plan diario para tu paciente</Typography>
      {!justCreated && !createDietaryPlan.error ? (
        <DietaryPlanForm
          control={control}
          fields={exampleFields}
          onSubmit={handleSubmit(onSubmit)}
          watch={watch}
          loading={createDietaryPlan.loading}
          confirmActionText='Enviar' />
      ): (
        <Box className="flex flex-col gap-4 items-center">
          {justCreated && (
            <>
              <Typography>Acabas de crear un plan nutricional para {watch('name')} {watch('surname')}</Typography>
              <Typography>Queres crear otro?</Typography>
            </>
          )}
          {createDietaryPlan.error && (
            <>
              <Typography>Hubo un error al crear un plan nutricional para {watch('name')} {watch('surname')}</Typography>
              <Typography>Quieres intentar de nuevo?</Typography>
            </>
          )}
          <Button variant='outlined' onClick={handleRestart}>Creemos otro</Button>
        </Box>
      )}
    </div>
  )
}