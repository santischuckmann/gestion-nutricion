import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from '../views/Home'
import { DietaryPlan } from '../views/DietaryPlan'

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
        path: '/caca',
        element: <div>cacona jeje</div>,
      },
    ]
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}