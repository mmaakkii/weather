import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';

import { Box } from '@mui/material';

const NavBarContents = () => (
  <>
    <CloudIcon sx={{ mr: 2, ml: 4 }} />
    <Typography
      variant="h6"
      noWrap
      component="h1"
      sx={{
        mr: 2,
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      WEATHER TASK
    </Typography>
  </>
);

export const ResponsiveAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavBarContents />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
