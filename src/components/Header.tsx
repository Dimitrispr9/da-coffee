// ...existing code...
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

import React, { useRef, useEffect, useState } from 'react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [adminVisited, setAdminVisited] = useState(false);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setAdminVisited(true);
    }
  }, [location.pathname]);

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'secondary.main', borderBottom: '1px solid #bca177' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}> 
            {/* Coffee cup emoji as icon, or replace with a custom icon if available */}
            <span style={{ fontSize: 32, marginRight: 8 }}>☕</span>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              Da-coffee
            </Typography>
          </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/')}
                  sx={{
                    color: isDarkMode ? 'primary.main' : (location.pathname === '/' ? 'primary.main' : 'text.secondary'),
                    fontWeight: location.pathname === '/' ? 700 : 400,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    },
                  }}
                >
                  Menu
                </Button>

                {(location.pathname === '/admin' || adminVisited) && (
                  <Button
                    color="inherit"
                    onClick={() => navigate('/admin')}
                    sx={{
                      color: location.pathname === '/admin' ? 'primary.main' : 'text.secondary',
                      fontWeight: location.pathname === '/admin' ? 700 : 400,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      },
                    }}
                  >
                    Admin Panel
                  </Button>
                )}

                <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      color: isDarkMode ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      },
                    }}
                  >
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>

        </AppBar>
  );
}

export default Header;
