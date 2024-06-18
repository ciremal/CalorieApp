import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsHome from "@/screens/MealsHome/MealsHome";
import MealSummary from "@/screens/MealSummary/MealSummary";
import SearchFood from "@/screens/SearchFood/SearchFood";
import FoodNutritionEdit from "@/screens/FoodNutritionEdit/FoodNutritionEdit";
import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { MealContextProvider } from "@/hooks/useMealContext";
import FoodNutritionEditManual from "@/screens/FoodNutritionEditManual/FoodNutritionEditManual";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
LogBox.ignoreAllLogs();

const Home = () => {
  return (
    <MealContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer independent={true}>
          <PaperProvider>
            <Stack.Navigator initialRouteName="Meal Home">
              <Stack.Screen name="Meal Home" component={MealsHome} />
              <Stack.Screen name="Meal Summary" component={MealSummary} />
              <Stack.Screen name="Search Food" component={SearchFood} />
              <Stack.Screen name="Food Edit" component={FoodNutritionEdit} />
              <Stack.Screen
                name="Food Edit Manual"
                component={FoodNutritionEditManual}
              />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </MealContextProvider>
  );
};

export default Home;
