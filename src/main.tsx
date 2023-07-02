import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './views/Home';
import './index.css'
import { Layout } from './containers/Layout';
import { StyledEngineProvider } from '@mui/material';

const router = createBrowserRouter([
  {
   element: <Layout />,
   children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/caca",
      element: <div>cacona jeje</div>,
    },
   ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>,
)
