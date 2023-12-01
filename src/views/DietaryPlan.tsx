import { useForm } from '../hooks/useForm'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { TextField } from '../components/TextField'
import { useState } from 'react'
import { useMutate } from '../hooks'
import { CreateDietaryPlanInsertionDto, SnackTime, MainCourseType } from '../shared'

type Fields<T extends keyof Record<string, unknown>> = {
  name: T,
  placeholder: string,
  initialValue: string,
  label: string
}

type HomeFields = {
  name: string,
  surname: string,
  observations: string,
  breakfast: string,
  lunch: string,
  dinner: string,
  lunchDessert: '',
  dinnerDessert: '',
  afternoonSnack: ''
}

const defaultValues: HomeFields = {
  name: '',
  surname: '', 
  observations: '',
  breakfast: '',
  lunch: '',
  dinner: '',
  lunchDessert: '',
  dinnerDessert: '',
  afternoonSnack: ''
}

const fields: Record<keyof HomeFields, Fields<keyof HomeFields>> = {
  name: { name: 'name', placeholder: 'santiago', initialValue: 'vacio', label: 'Nombre' }, 
  surname: { name: 'surname', placeholder: 'schuckmann', initialValue: 'vacio', label: 'Apellido' }, 
  observations: { name: 'observations', placeholder: 'este paciente tiene esto y aquello', initialValue: 'vacio', label: 'Observaciones' }, 
  breakfast: { name: 'breakfast', placeholder: 'tostadas con mate cocido', initialValue: 'vacio', label: 'Desayuno' }, 
  lunch: { name: 'lunch', placeholder: 'churrasco con ensalada', initialValue: 'vacio', label: 'Almuerzo' }, 
  lunchDessert: { name: 'lunchDessert', placeholder: 'helado', initialValue: '', label: 'Postre de almuerzo' }, 
  afternoonSnack: { name: 'afternoonSnack', placeholder: 'mate cocido con tostadas', initialValue: '', label: 'Merienda' }, 
  dinner: { name: 'dinner', placeholder: 'empanadas', initialValue: 'vacio', label: 'Cena' }, 
  dinnerDessert: { name: 'dinnerDessert', placeholder: 'yogurt', initialValue: '', label: 'Postre de cena' }, 
}

const parseFormToRequest = ({
  dinner,
  lunch,
  afternoonSnack,
  ...data
}: HomeFields): CreateDietaryPlanInsertionDto => {
  return {
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

export const DietaryPlan = () => {
  const createDietaryPlan = useMutate<{ id: number}>()
  const [ justCreated, setJustCreated ] = useState(false)
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues
  })

  const onSubmit = async (data: HomeFields) => {
    await createDietaryPlan.mutate({ endpoint: 'DietaryPlan', data: parseFormToRequest(data) })

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
      {!justCreated ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <Box className='flex flex-col gap-2'>
            <Typography>Informacion del paciente:</Typography>
            <Box className='flex gap-2'>
              <TextField control={control} {...fields.name} InputLabelProps={{ shrink: true }} />
              <TextField control={control} {...fields.surname} InputLabelProps={{ shrink: true }} />
            </Box>
          </Box>
          <TextField control={control} {...fields.breakfast} />
          <Box className='flex flex-col gap-2'>
            <Typography>Almuerzo:</Typography>
            <Box className='flex gap-2'>
              <TextField control={control} {...fields.lunch} InputLabelProps={{ shrink: true }} />
              <TextField control={control} {...fields.lunchDessert} InputLabelProps={{ shrink: true }} />
            </Box>
          </Box>
          <TextField control={control} {...fields.afternoonSnack} />
          <Box className='flex flex-col gap-2'>
            <Typography>Cena:</Typography>
            <Box className='flex gap-2'>
              <TextField control={control} {...fields.dinner} InputLabelProps={{ shrink: true }} />
              <TextField control={control} {...fields.dinnerDessert} InputLabelProps={{ shrink: true }} />
            </Box>
          </Box>
          {createDietaryPlan.loading ? (
            <CircularProgress />
          ) : (
            <Button type='submit'>Enviar</Button>
          )}
        </form>
      ): (
        <Box className="flex flex-col gap-4 items-center">
          {justCreated && (
            <>
              <Typography>Acabas de crear un plan nutricional para {watch('name')} {watch('surname')}</Typography>
              <Typography>Queres crear otro?</Typography>
            </>
          )}
          {!justCreated && createDietaryPlan.error && (
            <>
              <Typography>Hubo un error al crear un plan nutricional para {watch('name')} {watch('surname')}</Typography>
              <Typography>Queres intentar de nuevo?</Typography>
            </>
          )}
          <Button variant='outlined' onClick={handleRestart}>Creemos otro</Button>
        </Box>
      )}
    </div>
  )
}