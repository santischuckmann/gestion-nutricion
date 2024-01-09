export interface User {
  id: number
  username: string
  fullName: string
  email: string
}

export enum MainCourseType {
  Lunch = 1,
  Dinner = 2
}

export enum SnackTime {
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

export type CreateDietaryPlanInsertionDto = Omit<DietaryPlanDto, 'id'>

export interface DietaryPlanDto extends Record<string, unknown> {
  dietaryPlanId: number
  observations: string
  name: string
  surname: string
  breakfast: string
  mainCourses: MainCourseInsertionDto[]
  planSnacks: PlanSnackInsertionDto[]
}

export type Fields<T extends keyof Record<string, unknown>> = {
  name: T,
  placeholder: string,
  initialValue: string,
  label: string
}

export type HomeFields = {
  name: string,
  surname: string,
  observations: string,
  breakfast: string,
  lunch: string,
  dinner: string,
  lunchDessert: string,
  dinnerDessert: string,
  afternoonSnack: string
}

export const defaultValues: HomeFields = {
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

export const exampleFields: Record<keyof HomeFields, Fields<keyof HomeFields>> = {
  name: { name: 'name', placeholder: 'santiago', initialValue: 'vacio', label: 'Nombre' }, 
  surname: { name: 'surname', placeholder: 'schuckmann', initialValue: 'vacio', label: 'Apellido' }, 
  observations: { name: 'observations', placeholder: 'este paciente tiene esto y aquello', initialValue: 'vacio', label: 'Observaciones' }, 
  breakfast: { name: 'breakfast', placeholder: 'tostadas con mate cocido', initialValue: 'vacio', label: 'Desayuno' }, 
  lunch: { name: 'lunch', placeholder: 'churrasco con ensalada', initialValue: 'vacio', label: 'Almuerzo' }, 
  lunchDessert: { name: 'lunchDessert', placeholder: 'helado', initialValue: '', label: 'Postre de almuerzo' }, 
  afternoonSnack: { name: 'afternoonSnack', placeholder: 'mate cocido con tostadas', initialValue: '', label: 'Merienda' }, 
  dinner: { name: 'dinner', placeholder: 'empanadas', initialValue: 'vacio', label: 'Cena' }, 
  dinnerDessert: { name: 'dinnerDessert', placeholder: 'yogurt', initialValue: '', label: 'Postre de cena' }, 
}

export interface PatientDto {
   patientId: number
   name: string
   surname: string
   firstAppointmentDate: Date
   lastAppointmentDate: Date
   isActive: boolean
   dietaryPlanCount: number
}

export type DetailedPatientDto = Omit<PatientDto, 'dietaryPlanCount'> & {
  dietaryPlans: DietaryPlanDto[]
}