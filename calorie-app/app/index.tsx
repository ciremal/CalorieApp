import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsHome from "@/screens/MealsHome/MealsHome";
import MealSummary from "@/screens/MealSummary/MealSummary";
import SearchFood from "@/screens/SearchFood/SearchFood";
import FoodNutritionEdit from "@/screens/FoodNutritionEdit/FoodNutritionEdit";

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <NavigationContainer independent={true}>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Meal Home" component={MealsHome} />
          <Stack.Screen name="Meal Summary" component={MealSummary} />
          <Stack.Screen name="Search Food" component={SearchFood} />
          <Stack.Screen name="Food Edit" component={FoodNutritionEdit} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Home;
