import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { categories } from '../data/pizzas';
import { Pizza } from '../types';
import { usePizza } from '../context/PizzaContext';


const ADMIN_PASSWORD = 'Da-pizza6969';

const AdminPanel: React.FC = () => {
  const { pizzas: pizzaList, addPizza, updatePizza, deletePizza } = usePizza();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);
  const [formData, setFormData] = useState<Partial<Pizza>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    available: true,
    ingredients: [],
  });
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  if (!authenticated) {
    const handleLogin = () => {
      setLoginAttempted(true);
      if (password === ADMIN_PASSWORD) {
        setAuthenticated(true);
      }
    };
    return (
      <Container maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 4, width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Admin Login</Typography>
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginAttempted(false); }}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              )
            }}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 1 }}
          >
            Login
          </Button>
          {loginAttempted && password !== ADMIN_PASSWORD && (
            <Alert severity="error" sx={{ mt: 2 }}>Λάθος κωδικός!</Alert>
          )}
        </Paper>
      </Container>
    );
  }

  const handleOpenDialog = (pizza?: Pizza) => {
    if (pizza) {
      setEditingPizza(pizza);
      setFormData(pizza);
    } else {
      setEditingPizza(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        available: true,
        ingredients: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPizza(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      available: true,
      ingredients: [],
    });
  };

  const handleSave = () => {
    if (editingPizza) {
      // Update existing pizza
      const updatedPizza: Pizza = {
        ...editingPizza,
        ...formData,
      };
      updatePizza(updatedPizza);
    } else {
      // Add new pizza
      const newPizza: Pizza = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        image: formData.image || '',
        category: formData.category || '',
        available: formData.available || true,
        ingredients: formData.ingredients || [],
      };
      addPizza(newPizza);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    deletePizza(id);
  };

  const handleInputChange = (field: keyof Pizza, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIngredientsChange = (value: string) => {
    const ingredients = value.split(',').map(ingredient => ingredient.trim());
    setFormData(prev => ({ ...prev, ingredients }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main' }}>
          Admin Panel
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Manage your pizza menu and orders
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ px: 3 }}
          >
            Add New Pizza
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Pizzas
              </Typography>
              <Typography variant="h4" color="primary.main">
                {pizzaList.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Available
              </Typography>
              <Typography variant="h4" color="success.main">
                {pizzaList.filter(p => p.available).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Categories
              </Typography>
              <Typography variant="h4" color="primary.main">
                {categories.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 0 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Price
              </Typography>
              <Typography variant="h4" color="primary.main">
                ${(pizzaList.reduce((sum, p) => sum + p.price, 0) / pizzaList.length).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Pizza Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Image</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pizzaList.map((pizza) => (
                <TableRow key={pizza.id} hover>
                  <TableCell>
                    <Box
                      component="img"
                      src={pizza.image}
                      alt={pizza.name}
                      sx={{
                        width: 60,
                        aspectRatio: '4/3',
                        height: 'auto',
                        borderRadius: 1,
                        objectFit: 'cover',
                        background: '#f5f5f5',
                        display: 'block',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {pizza.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
                        {pizza.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={pizza.category} color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                      ${pizza.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={pizza.available ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      label={pizza.available ? 'Available' : 'Unavailable'}
                      color={pizza.available ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(pizza)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(pizza.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPizza ? 'Edit Pizza' : 'Add New Pizza'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <TextField
                fullWidth
                label="Pizza Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                sx={{ flex: '1 1 300px', minWidth: 0 }}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                InputProps={{ startAdornment: '$' }}
                sx={{ flex: '1 1 200px', minWidth: 0 }}
              />
            </Box>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                helperText="Enter a valid image URL"
                sx={{ flex: '1 1 300px', minWidth: 0 }}
              />
              <FormControl fullWidth sx={{ flex: '1 1 200px', minWidth: 0 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label="Ingredients (comma-separated)"
              value={formData.ingredients?.join(', ')}
              onChange={(e) => handleIngredientsChange(e.target.value)}
              helperText="Enter ingredients separated by commas"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.available}
                  onChange={(e) => handleInputChange('available', e.target.checked)}
                />
              }
              label="Available for ordering"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingPizza ? 'Update' : 'Add'} Pizza
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;
