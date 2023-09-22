import { Button, Link, Typography } from '@mui/material'

export const Home = () => {
  return (
    <div className="flex flex-col gap-4 p-4 items-center text-center">
      <Typography variant='h3'>Bienvenido al Sistema de Gestion para Nutricionistas</Typography>
      <Typography variant='h6'>Crea planes personalizados, anota las medidas antropometricas de tus pacientes y
        recibi datos analiticos sobre su progreso!
      </Typography>
      <Link href='/dietaryPlan'>Crea tu primer plan nutricional</Link>
    </div>
  )
}