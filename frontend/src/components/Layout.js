import * as React from 'react';
import { Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Layout = ({ children, open }) => {
  const theme = useTheme();
  const drawerWidth = 240;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
        ml: { sm: open ? `${drawerWidth}px` : 0 },
        p: 0,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar />
      <Box 
        sx={{ 
          p: { xs: 2, sm: 2, md: 2 },
          paddingLeft: 0,
          marginLeft: 0,
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 