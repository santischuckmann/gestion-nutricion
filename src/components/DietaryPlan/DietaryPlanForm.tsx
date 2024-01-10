import { Box, Button, CircularProgress, MenuItem, Select as MUISelect, Typography } from '@mui/material'
import { TextField } from '../TextField'
import { Control, UseFormWatch } from 'react-hook-form'
import { Fields, HomeFields, Option, PatientDto } from '../../shared'
import { useDataFetching } from '../../hooks'
import { Select } from '../Select'
import { useMemo } from 'react'

interface DietaryPlanFormProps {
  control: Control<HomeFields, any>
  loading: boolean
  confirmActionText: string
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  watch: UseFormWatch<HomeFields>
  fields: Record<keyof HomeFields, Fields<keyof HomeFields>>
}

export const DietaryPlanForm = ({
  control,
  fields,
  loading,
  confirmActionText,
  watch,
  onSubmit
}: DietaryPlanFormProps) => {
  const patients = useDataFetching<PatientDto[]>('Patient')

  const patientsOptions: Option[] = useMemo(() => {
    const options = patients.data?.map(patient => ( { id: patient.patientId, description: `${patient.name} ${patient.surname}` }))

    if (!options)
      return []
    
    return [ { id: parseInt(fields.patientId.defaultValue), description: 'Seleccione un paciente' }, ...options ]
  }, [ patients ])

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Select 
        control={control} 
        {...fields.patientId}
        options={patientsOptions}
        distinctKey='selectPatient-createPlan'>
      </Select>
      {watch('patientId') == 0 && (
        <Box className='flex flex-col gap-2'>
          <Typography>Informacion del paciente:</Typography>
          <Box className='flex gap-2'>
            <TextField control={control} {...fields.name} InputLabelProps={{ shrink: true }} />
            <TextField control={control} {...fields.surname} InputLabelProps={{ shrink: true }} />
          </Box>
        </Box>
      )}
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