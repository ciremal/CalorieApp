import MealsHome from "../screens/MealsHome/MealsHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealSummary from "../screens/MealSummary/MealSummary";
import SearchFood from "../screens/SearchFood/SearchFood";
import FoodNutritionEdit from "../screens/FoodNutritionEdit/FoodNutritionEdit";
import FoodNutritionEditManual from "../screens/FoodNutritionEditManual/FoodNutritionEditManual";
import { Colors } from "@/constants/Colors";

const CalorieTrackHome = () => {
  const MealTrackingStack = createNativeStackNavigator();

  return (
    <MealTrackingStack.Navigator
      initialRouteName="Meal Home"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.lightWhite.text },
      }}
    >
      <MealTrackingStack.Screen name="Meal Home" component={MealsHome} />
      <MealTrackingStack.Screen name="Meal Summary" component={MealSummary} />
      <MealTrackingStack.Screen name="Search Food" component={SearchFood} />
      <MealTrackingStack.Screen
        name="Food Edit"
        component={FoodNutritionEdit}
      />
      <MealTrackingStack.Screen
        name="Food Edit Manual"
        component={FoodNutritionEditManual}
      />
    </MealTrackingStack.Navigator>
  );
};

export default CalorieTrackHome;
