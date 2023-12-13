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

export interface DietaryPlanDto {
  id: number
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