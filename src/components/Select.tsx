import { TextField as MUITextField, MenuItem, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Option } from '../shared'

type InputProps<T extends FieldValues>  = {
  control: Control<T, any>
  name: string
  options: Option[]
  distinctKey: string
} & TextFieldProps

export function Select <T extends FieldValues> ({ control, options, distinctKey, ...props }: InputProps<T>) {
  return (
    <Controller
      name={props.name as FieldPath<T>}
      control={control}
      render={({ field }) => {
        return (
          <MUITextField {...field} select {...props} id={props.name}>
            {options.map(option => (
              <MenuItem key={`${distinctKey}-${option.id}`} value={option.id}>
                {option.description}
              </MenuItem> ))}
          </MUITextField>
        )
      }} />
  )
}