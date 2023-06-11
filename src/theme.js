import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFEF00',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#6A3940',
    },
  },
});

export default theme;