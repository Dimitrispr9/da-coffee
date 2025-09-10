import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Chip,
  Badge,
  Fab,
  Paper,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {

  const { state, toggleCart, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const theme = useTheme();
  const creamyColor = '#E2CFB3';
  const brownColor = '#7C5A2A';
  const mainTextColor = brownColor;
  const badgeColor = 'red';
  const badgeBorder = `2px solid ${badgeColor}`;

  const handleQuantityChange = (pizzaId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(pizzaId, newQuantity);
  };

  return (
    <>
      {/* Cart FAB */}
      <Fab
        color="primary"
        aria-label="cart"
        onClick={toggleCart}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Badge badgeContent={getTotalItems()} sx={{
          '& .MuiBadge-badge': {
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 700,
            border: 'none',
          },
        }}>
          <CartIcon />
        </Badge>
      </Fab>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={state.isOpen}
        onClose={closeCart}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#E2CFB3' : '#7C5A2A', fontWeight: 600 }}>
              Το καλάθι σας
            </Typography>
            <IconButton onClick={closeCart} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Cart Items */}
          {state.items.length === 0 ? (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <CartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Το καλάθι σας είναι άδειο
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Προσθέστε νόστιμες πίτσες για να ξεκινήσετε!
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ flex: 1, overflow: 'auto' }}>
                {state.items.map((item) => (
                  <Paper key={item.pizzaId} sx={{ mb: 2, p: 2 }}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {item.pizzaName}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {item.price.toLocaleString('el-GR', { style: 'currency', currency: 'EUR' })} το τεμάχιο
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeItem(item.pizzaId)}
                          size="small"
                          sx={{ color: 'red' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.pizzaId, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Chip 
                          label={item.quantity} 
                          variant="outlined" 
                          sx={{
                            color: mainTextColor,
                            borderColor: mainTextColor,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.pizzaId, item.quantity, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: '#FFF8E7',
                        color: '#6F4E37',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        minWidth: 70,
                        textAlign: 'center',
                        border: '1px solid #DCC7AA',
                      }}>
                        {(item.price * item.quantity).toLocaleString('el-GR', { style: 'currency', currency: 'EUR' })}
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </List>

              {/* Cart Summary */}
              <Paper sx={{ p: 3, mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Total Items:</Typography>
                  <Typography variant="h6" sx={{ color: mainTextColor, fontWeight: 700 }}>
                    {getTotalItems()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Total:
                  </Typography>
                  <Box sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: '#FFF8E7',
                    color: mainTextColor,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    minWidth: 70,
                    textAlign: 'center',
                    border: '1px solid #DCC7AA',
                  }}>
                    {getTotalPrice().toLocaleString('el-GR', { style: 'currency', currency: 'EUR' })}
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ 
                    py: 1.5, 
                    fontWeight: 600,
                    backgroundColor: '#FFF8E7',
                    color: '#6F4E37',
                    border: '1px solid #DCC7AA',
                    '&:hover': {
                      backgroundColor: '#F5E6D6',
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;



