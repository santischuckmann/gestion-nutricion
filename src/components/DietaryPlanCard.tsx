import { DietaryPlanDto, MainCourseType, SnackTime } from '../shared'

export const DietaryPlanCard = ({
  dietaryPlan,
  onEdit
}: { dietaryPlan: DietaryPlanDto, onEdit: (id: number) => void}) => {
  const snacksBySnackTime = dietaryPlan.planSnacks.reduce<{ [ key: number ]: string }>((acc, value) => {
    acc[value.idSnackTime] = value.food

    return acc
  }, {})
  
  const mainCourseByMainCourseType = dietaryPlan.mainCourses.reduce<{ [ key: number ]: { food: string, dessert: string } }>((acc, value) => {
    acc[value.idMainCourseType] = {
      food: value.food,
      dessert: value.dessert
    }

    return acc
  }, {})


  return (
    <div className='flex gap-2 flex-col items-center border-emerald-400 border-2 rounded-lg w-max p-4'>
      Nombre del paciente: {dietaryPlan.name} {dietaryPlan.surname}
      <span>Desayuno: {dietaryPlan.breakfast}</span>
      {snacksBySnackTime[SnackTime.BreakfastAndLunch]}
      <span>Almuerzo: {mainCourseByMainCourseType[MainCourseType.Lunch].food}</span>
      <span>Postre: {mainCourseByMainCourseType[MainCourseType.Lunch].dessert}</span>
      <span>Cena: {mainCourseByMainCourseType[MainCourseType.Dinner].food}</span>
      <span>Postre: {mainCourseByMainCourseType[MainCourseType.Dinner].dessert}</span>
      <button onClick={() => onEdit(dietaryPlan.id)}>Editar</button>
    </div>
  )
}