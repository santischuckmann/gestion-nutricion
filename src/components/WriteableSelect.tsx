import { AutocompleteProps, Autocomplete, TextField } from '@mui/material'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

type InputProps<T extends FieldValues, K extends string>  = {
  control: Control<T, any>
  label: string
  name: string
} & Omit<AutocompleteProps<K, true, true, true>, 'renderInput' | 'defaultValue'>

export function WriteableSelect <T extends FieldValues, K extends string> ({ control, options, ...props }: InputProps<T, K>) {
  return (
    <Controller
      name={props.name as FieldPath<T>}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          {...props}
          value={field.value}
          onChange={(_, value) => {
            field.onChange(value)
          }}
          freeSolo
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} {...field} label={props.label} />}
        />
      )} 
    />
  )
}