import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { DietaryPlan } from './views/DietaryPlan'
import './index.css'
import { Layout } from './containers/Layout'
import { StyledEngineProvider } from '@mui/material'
import { Home } from './views/Home'

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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>,
)
