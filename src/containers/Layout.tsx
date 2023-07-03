import { AppBar, Box, CssBaseline, Divider, Drawer, Link, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

const drawerWidth = 200

export const Layout = () => {
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
          <p>holi</p>
          <Divider variant='middle' className='m-4'/>
          <Link href='/dietaryPlan'>Plan Nutricional</Link>
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