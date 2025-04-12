import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  Typography,
  useMediaQuery,
  Container
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Check if user is already authenticated
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <Container component="main" maxWidth="lg" sx={{ height: '100vh' }}>
      <Grid 
        container 
        sx={{ 
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Left side - Content */}
        <Grid 
          item 
          mobile={12} 
          tablet={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 450,
              width: '100%'
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 3 }}
            >
              Family App
            </Typography>
            
            <Paper
              elevation={3}
              sx={{
                p: 4,
                width: '100%',
                borderRadius: 2
              }}
            >
              <Outlet />
            </Paper>
          </Box>
        </Grid>
        
        {/* Right side - Image (Hidden on mobile) */}
        {!isMobile && (
          <Grid
            item
            mobile={12}
            tablet={6}
            sx={{
              height: '100%',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.palette.primary.main,
              p: 4,
              position: 'relative'
            }}
          >
            <Box
              sx={{
                color: 'white',
                textAlign: 'center',
                zIndex: 1
              }}
            >
              <Typography variant="h4" gutterBottom>
                Connect with your family
              </Typography>
              <Typography variant="body1">
                Stay connected with your loved ones, share photos, manage family budgets,
                and explore your family tree — all in one secure platform.
              </Typography>
            </Box>
            
            {/* Background pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.586l5.586-5.586L180 165.414v5.172l-3 3H172zM0 145.586L5.586 151H0v-5.414zM2.414 151L8 145.414 13.586 151H2.414zm-2-6h11.172L8 150.586 2.414 145zM0 140.414L5.586 146H0v-5.586zM10.414 146L16 140.414 21.586 146H10.414zm-8-6h11.172L8 145.586 2.414 140zM0 135.414L5.586 141H0v-5.586zM10.414 141L16 135.414 21.586 141H10.414zm-8-6h11.172L8 140.586 2.414 135zM0 130.414L5.586 136H0v-5.586zM10.414 136L16 130.414 21.586 136H10.414zm-8-6h11.172L8 135.586 2.414 130zM0 125.414L5.586 131H0v-5.586zM10.414 131L16 125.414 21.586 131H10.414zm-8-6h11.172L8 130.586 2.414 125zM0 120.414L5.586 126H0v-5.586zM10.414 126L16 120.414 21.586 126H10.414zm-8-6h11.172L8 125.586 2.414 120zM0 115.414L5.586 121H0v-5.586zM10.414 121L16 115.414 21.586 121H10.414zm-8-6h11.172L8 120.586 2.414 115zM0 110.414L5.586 116H0v-5.586zM10.414 116L16 110.414 21.586 116H10.414zm-8-6h11.172L8 115.586 2.414 110zM0 105.414L5.586 111H0v-5.586zM10.414 111L16 105.414 21.586 111H10.414zm-8-6h11.172L8 110.586 2.414 105zM0 100.414L5.586 106H0v-5.586zM10.414 106L16 100.414 21.586 106H10.414zm-8-6h11.172L8 105.586 2.414 100zM0 95.414L5.586 101H0v-5.586zM10.414 101L16 95.414 21.586 101H10.414zm-8-6h11.172L8 100.586 2.414 95zM0 90.414L5.586 96H0v-5.586zM10.414 96L16 90.414 21.586 96H10.414zm-8-6h11.172L8 95.586 2.414 90zM0 85.414L5.586 91H0v-5.586zM10.414 91L16 85.414 21.586 91H10.414zm-8-6h11.172L8 90.586 2.414 85zM0 80.414L5.586 86H0v-5.586zM10.414 86L16 80.414 21.586 86H10.414zm-8-6h11.172L8 85.586 2.414 80zM0 75.414L5.586 81H0v-5.586zM10.414 81L16 75.414 21.586 81H10.414zm-8-6h11.172L8 80.586 2.414 75zM0 70.414L5.586 76H0v-5.586zM10.414 76L16 70.414 21.586 76H10.414zm-8-6h11.172L8 75.586 2.414 70zM0 65.414L5.586 71H0v-5.586zM10.414 71L16 65.414 21.586 71H10.414zm-8-6h11.172L8 70.586 2.414 65zM0 60.414L5.586 66H0v-5.586zM10.414 66L16 60.414 21.586 66H10.414zm-8-6h11.172L8 65.586 2.414 60zM0 55.414L5.586 61H0v-5.586zM10.414 61L16 55.414 21.586 61H10.414zm-8-6h11.172L8 60.586 2.414 55zM0 50.414L5.586 56H0v-5.586zM10.414 56L16 50.414 21.586 56H10.414zm-8-6h11.172L8 55.586 2.414 50zM0 45.414L5.586 51H0v-5.586zM10.414 51L16 45.414 21.586 51H10.414zm-8-6h11.172L8 50.586 2.414 45zM0 40.414L5.586 46H0v-5.586zM10.414 46L16 40.414 21.586 46H10.414zm-8-6h11.172L8 45.586 2.414 40zM0 35.414L5.586 41H0v-5.586zM10.414 41L16 35.414 21.586 41H10.414zm-8-6h11.172L8 40.586 2.414 35zM0 30.414L5.586 36H0v-5.586zM10.414 36L16 30.414 21.586 36H10.414zm-8-6h11.172L8 35.586 2.414 30zM0 25.414L5.586 31H0v-5.586zM10.414 31L16 25.414 21.586 31H10.414zm-8-6h11.172L8 30.586 2.414 25zM0 20.414L5.586 26H0v-5.586zM10.414 26L16 20.414 21.586 26H10.414zm-8-6h11.172L8 25.586 2.414 20zM0 15.414L5.586 21H0v-5.586zM10.414 21L16 15.414 21.586 21H10.414zm-8-6h11.172L8 20.586 2.414 15zM0 10.414L5.586 16H0v-5.586zM10.414 16L16 10.414 21.586 16H10.414zm-8-6h11.172L8 15.586 2.414 10zM0 5.414L5.586 11H0V5.414zM10.414 11L16 5.414 21.586 11H10.414zm-8-6h11.172L8 10.586 2.414 5zM0 .414L5.586 6H0V.414zM10.414 6L16 .414 21.586 6H10.414zm-8-6h11.172L8 5.586 2.414 0zM180 30.414L174.414 36H180v-5.586zm-8 5.586l5.586-5.586L180 30.414v5.172l-3 3H172zM180 25.414L174.414 31H180v-5.586zm-8 5.586l5.586-5.586L180 25.414v5.172l-3 3H172zM180 20.414L174.414 26H180v-5.586zm-8 5.586l5.586-5.586L180 20.414v5.172l-3 3H172zM180 15.414L174.414 21H180v-5.586zm-8 5.586l5.586-5.586L180 15.414v5.172l-3 3H172zM180 10.414L174.414 16H180v-5.586zm-8 5.586l5.586-5.586L180 10.414v5.172l-3 3H172zM180 5.414L174.414 11H180V5.414zm-8 5.586l5.586-5.586L180 5.414v5.172l-3 3H172zM180 .414L174.414 6H180V.414zm-8 5.586l5.586-5.586L180 .414v5.172l-3 3H172z' fill='%23FFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AuthLayout; 