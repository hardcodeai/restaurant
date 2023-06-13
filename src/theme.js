import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFEF00',
    },
    primary: {
      main: '#7c7a7a',
    },
    error: {
      main: '#6A3940',
    },
  },
});

export default theme;