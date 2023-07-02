import { useEffect, useState } from "react"
import { request } from "../libraries/axios-lib";
import { useForm } from "../hooks/useForm";
import { Button, Typography } from "@mui/material";
import { TextField } from "../components/TextField";


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

type Fields<T extends keyof Record<string, unknown>> = {
  name: T,
  placeholder: string,
  initialValue: string,
  label: string
}

enum MainCourseType {
  Lunch = 1,
  Dinner = 2
}

enum SnackTime {
  BreakfastAndLunch = 1,
  AfternoonSnack = 2,
  BeforeDinner = 3,
  ExactTime = 4,
}

interface MainCourseInsertionDto {
  idMainCourseType: MainCourseType
  food: string
  dessert: string
}

interface PlanSnackInsertionDto {
  food: string
  idSnackTime: SnackTime
}

interface CreateDietaryPlanInsertionDto {
  observations: string
  name: string
  surname: string
  breakfast: string
  mainCourses: MainCourseInsertionDto[]
  planSnacks: PlanSnackInsertionDto[]
}

const fields: Fields<keyof HomeFields>[] = [
  { name: "name", placeholder: "santiago", initialValue: 'vacio', label: 'Nombre'},
  { name: "surname", placeholder: "schuckmann", initialValue: 'vacio', label: 'Apellido'},
  { name: "observations", placeholder: "este paciente tiene esto y aquello", initialValue: 'vacio', label: 'Observaciones'},
  { name: "breakfast", placeholder: "tostadas con mate cocido", initialValue: 'vacio', label: 'Desayuno'},
  { name: "lunch", placeholder: "churrasco con ensalada", initialValue: 'vacio', label: 'Almuerzo'},
  { name: "lunchDessert", placeholder: "helado", initialValue: '', label: 'Postre de almuerzo'},
  { name: "afternoonSnack", placeholder: "mate cocido con tostadas", initialValue: '', label: 'Merienda'},
  { name: "dinner", placeholder: "empanadas", initialValue: 'vacio', label: 'Cena'},
  { name: "dinnerDessert", placeholder: "yogurt", initialValue: '', label: 'Postre de cena'},
]

const parseFormToRequest = ({
  dinner,
  lunch,
  afternoonSnack,
  ...data
}: HomeFields): CreateDietaryPlanInsertionDto => {
  return {
    observations: data.observations,
    name: data.name,
    breakfast: data.breakfast,
    surname: data.surname,
    planSnacks: [{
      food: afternoonSnack,
      idSnackTime: SnackTime.BreakfastAndLunch
    }],
    mainCourses: [{
      idMainCourseType: MainCourseType.Lunch,
      food: lunch,
      dessert: data.lunchDessert
    }, {
      idMainCourseType: MainCourseType.Dinner,
      food: dinner,
      dessert: data.dinnerDessert
    }]
  }
}

export const Home = () => {
  const { handleSubmit, control } = useForm({
    defaultValues
  })
  
  
  const [ snacks, setSnacks ] = useState<Snack[]>([])

  useEffect(() => {
    (async () => {
      const reqSnacks = await request({ url: 'Snack/Snacks' })
  
      setSnacks(reqSnacks)
    })()
  }, [])

  const onSubmit = async (data: HomeFields) => {
    await request({ method: "POST", url: 'DietaryPlan', data: parseFormToRequest(data)})
  }

  return (
    <div className="flex flex-col gap-2">
      {snacks.length > 0 && (
        snacks.map((snack) => {
          return (
            <div className="text-slate-500 flex flex-row gap-1">
              <Typography variant="h4">
                {snack.food}
              </Typography>
              <p>
                {snack.intakeHour}
              </p>
            </div>
          )
        })
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-2 m-4">
        {fields.map((field) => (
          <TextField {...field} control={control}/>
        ))}
        <Button variant="outlined" className="col-start-2 border border-blue-300"type='submit'>enviar</Button>
      </form>
    </div>
  )
}