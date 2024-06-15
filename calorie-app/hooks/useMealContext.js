import React, { createContext, useState } from "react";

// Create a Context
const MealContext = createContext();

// Create a Provider component
const MealContextProvider = ({ children }) => {
  const [selectedMeal, setSelectedMeal] = useState("Meal Initial");

  return (
    <MealContext.Provider value={{ selectedMeal, setSelectedMeal }}>
      {children}
    </MealContext.Provider>
  );
};

export { MealContext, MealContextProvider };
