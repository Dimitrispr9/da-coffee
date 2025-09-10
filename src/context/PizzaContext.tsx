import React, { createContext, useContext, useState, ReactNode } from 'react';
import { pizzas as initialPizzas } from '../data/pizzas';
import { Pizza } from '../types';

interface PizzaContextType {
  pizzas: Pizza[];
  addPizza: (pizza: Pizza) => void;
  updatePizza: (pizza: Pizza) => void;
  deletePizza: (id: string) => void;
  togglePizzaAvailability: (id: string) => void;
}

const PizzaContext = createContext<PizzaContextType | undefined>(undefined);

export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizza must be used within a PizzaProvider');
  }
  return context;
};

interface PizzaProviderProps {
  children: ReactNode;
}

export const PizzaProvider: React.FC<PizzaProviderProps> = ({ children }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas);

  const addPizza = (pizza: Pizza) => {
    setPizzas(prev => [...prev, pizza]);
  };

  const updatePizza = (updatedPizza: Pizza) => {
    setPizzas(prev => prev.map(pizza => 
      pizza.id === updatedPizza.id ? updatedPizza : pizza
    ));
  };

  const deletePizza = (id: string) => {
    setPizzas(prev => prev.filter(pizza => pizza.id !== id));
  };

  const togglePizzaAvailability = (id: string) => {
    setPizzas(prev => prev.map(pizza => 
      pizza.id === id ? { ...pizza, available: !pizza.available } : pizza
    ));
  };

  const value: PizzaContextType = {
    pizzas,
    addPizza,
    updatePizza,
    deletePizza,
    togglePizzaAvailability,
  };

  return <PizzaContext.Provider value={value}>{children}</PizzaContext.Provider>;
};



