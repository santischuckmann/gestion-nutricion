import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { StyledEngineProvider } from '@mui/material'
import { AppRouter } from './containers/AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AppRouter />
    </StyledEngineProvider>
  </React.StrictMode>,
)
