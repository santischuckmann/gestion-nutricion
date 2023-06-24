import { FieldValues, UseFormProps, useForm as useFormLib } from 'react-hook-form'

export const useForm = <T extends FieldValues>({ defaultValues, reValidateMode = 'onChange', mode = 'all' }: UseFormProps<T>) => {
  const form = useFormLib<T>({
    defaultValues,
    reValidateMode,
    mode,
  })

  return form
}
