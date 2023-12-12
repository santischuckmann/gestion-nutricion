import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Control, FieldValues, UseFormHandleSubmit } from 'react-hook-form'

interface DietaryPlanFormProps<T extends FieldValues> {
  control: Control<T>
  fields: T
  loading: boolean
  confirmActionText: string
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export const DietaryPlanForm = <T extends FieldValues>({
  control,
  fields,
  loading,
  confirmActionText,
  onSubmit
}: DietaryPlanFormProps<T>) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
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
      {loading ? (
        <CircularProgress />
      ) : (
        <Button type='submit'>{confirmActionText}</Button>
      )}
    </form>
  )
}