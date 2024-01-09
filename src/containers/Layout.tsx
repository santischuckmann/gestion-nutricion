import { AppBar, Box, CssBaseline, Divider, Drawer, Link, Toolbar, Typography } from '@mui/material'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { request } from '../libraries/axios-lib'
import { User } from '../shared'

const drawerWidth = 200

export const Layout = () => {
  const [ user, setUser ] = useState<User | null>(null)

  const [ searchParams ] = useSearchParams()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')
      const accessToken = searchParams.get('accessToken')

      if (!accessToken && !token){
        window.location.replace('http://127.0.0.1:5500?redirectionUrl=http://localhost:5173')
      }

      if (accessToken){
        localStorage.setItem('token', accessToken)
        window.location.replace(window.location.origin)
      }

      if (token) {
        const user: User = await request({ 
          endpoint: 'User/AuthenticatedUser',
          method: 'get' 
        })

        setUser(user)
      }
    })()
  }, [])

  return (
    <Box display='flex'>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar variant='dense'>
          <Typography variant="h6" noWrap component="div" className='text-gray-100 '>
            Gestion Nutrición
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor='left' 
        variant='permanent'
      >
        <Box className='text-center mt-2'>
          <Link variant="h5" className='text-gray-600' href='/' underline='hover'>
            Gestion Nutrición
          </Link>
          <p>hola {user?.fullName ?? ''}</p>
          <Divider variant='middle' className='m-4'/>
          <Link href='/dietaryPlan'>Plan Nutricional</Link>
          <Divider variant='middle' className='m-4'/>
          <Link href='/dietaryPlans'>Planes creados</Link>
          <Divider variant='middle' className='m-4'/>
          <Link href='/patients'>Pacientes</Link>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}