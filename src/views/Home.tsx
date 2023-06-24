import { useEffect, useState } from "react"
import { request } from "../libraries/axios-lib";
import { useForm } from "../hooks/useForm";
import { Input } from "../components/Input";


interface Snack {
  food: string;
  intakeHour: string;
}

type HomeFields = {
  name: string,
  surname: string,
  observations: string,
  breakfast: string,
  lunch: string,
  dinner: string,
}

const defaultValues: HomeFields = {
  name: '',
  surname: '', 
  observations: '',
  breakfast: '',
  lunch: '',
  dinner: '',
}

type Fields<T extends keyof Record<string, unknown>> = {
  name: T,
  placeholder: string,
  initialValue: string,
}

const fields: Fields<keyof HomeFields>[] = [
  { name: "name", placeholder: "santiago", initialValue: 'vacio'},
  { name: "surname", placeholder: "schuckmann", initialValue: 'vacio'},
  { name: "observations", placeholder: "este paciente tiene esto y aquello", initialValue: 'vacio'},
  { name: "breakfast", placeholder: "tostadas con mate cocido", initialValue: 'vacio'},
  { name: "lunch", placeholder: "churrasco con ensalada", initialValue: 'vacio'},
  { name: "dinner", placeholder: "empanadas", initialValue: 'vacio'},
]

export const Home = () => {
  const { register, handleSubmit } = useForm({
    defaultValues
  })
  
  const onSubmit = handleSubmit((data) => console.log(data))

  
  const [ snacks, setSnacks ] = useState<Snack[]>([])

  useEffect(() => {
    (async () => {
      const reqSnacks = await request({ url: 'Snack/Snacks' })
  
      setSnacks(reqSnacks)
    })()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {snacks.length > 0 && (
        snacks.map((snack) => {
          return (
            <div className="text-slate-500 flex flex-row gap-1">
              <p>
                {snack.food}
              </p>
              <p>
                {snack.intakeHour}
              </p>
            </div>
          )
        })
      )}
      <form onSubmit={onSubmit} className="grid grid-cols-3 gap-2 m-4">
        {fields.map((field) => (
          <Input key={field.name} registration={() => register(field.name)} placeholder={field.placeholder} />
        ))}
        <button className="col-start-2"type='submit'>enviar</button>
      </form>
    </div>
  )
}