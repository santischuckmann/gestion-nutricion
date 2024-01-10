import { Box, Button, CircularProgress, Select as MUISelect, Typography } from '@mui/material'
import { TextField } from '../TextField'
import { Control } from 'react-hook-form'
import { Fields, HomeFields } from '../../shared'

interface DietaryPlanFormProps {
  control: Control<HomeFields, any>
  loading: boolean
  confirmActionText: string
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  fields: Record<keyof HomeFields, Fields<keyof HomeFields>>
}

export const DietaryPlanEditionForm = ({
  control,
  fields,
  loading,
  confirmActionText,
  onSubmit
}: DietaryPlanFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
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