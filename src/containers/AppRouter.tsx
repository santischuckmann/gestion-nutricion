import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from '../views/Home'
import { DietaryPlan } from '../views/DietaryPlan'
import { DietaryPlans } from '../views/DietaryPlans'
import { Patients } from '../views/Patients'
import { PatientDetail } from '../views/PatientDetail'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dietaryPlan',
        element: <DietaryPlan />
      },
      {
        path: '/dietaryPlans',
        element: <DietaryPlans />
      },
      {
        path: '/patients',
        element: <Patients />
      },
      {
        path: '/patients/:patientId',
        element: <PatientDetail />
      },
      {
        path: '/caca',
        element: <div>cacona jeje</div>,
      },
    ]
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}