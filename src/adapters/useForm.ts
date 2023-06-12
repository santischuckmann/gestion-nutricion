/* eslint-disable @typescript-eslint/no-explicit-any */
interface Form {
  values: Record<string, any>
}

export const useForm = (): Form => {
  const values = {
    hola: 'que onda wacho'
  }

  return {
    values
  }
}