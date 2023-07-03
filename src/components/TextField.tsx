import { TextFieldProps, TextField as MUITextField } from '@mui/material'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

type InputProps<T extends FieldValues>  = {
  control: Control<T, any>
  name: string
} & TextFieldProps

export function TextField <T extends FieldValues> ({ control, ...props }: InputProps<T>) {
  return (
    <Controller
      name={props.name as FieldPath<T>}
      control={control}
      render={({ field }) => (
        <MUITextField {...field} {...props} label={props.label} id={props.name} />
      )} />
  )
}