import { Box, BoxProps } from '@mui/material'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const ModalBox = ({
  children,
  ...props
}: BoxProps) => {
  return (
    <Box {...props} className='w-1/2 bg-white rounded-sm' sx={style}>
      {children}
    </Box>
  )
}