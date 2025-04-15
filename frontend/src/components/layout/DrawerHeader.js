import { styled } from '@mui/material/styles';

/**
 * Styled component for the drawer header
 * Used in AppLayout for consistent drawer header styling
 */
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
})); 