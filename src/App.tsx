import React, { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import Menu from './pages/Menu';
import AdminPanel from './pages/AdminPanel';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { PizzaProvider } from './context/PizzaContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);

  const handleContinue = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onContinue={handleContinue} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Cart />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PizzaProvider>
        <CartProvider>
          <BrowserRouter basename="/Dimitris">
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </PizzaProvider>
    </ThemeProvider>
  );
}

export default App;
