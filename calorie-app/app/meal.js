import { PaperProvider } from "react-native-paper";
import MealSummary from "../screens/MealSummary/mealSummary";

const Meal = () => {
  return (
    <PaperProvider>
      <MealSummary />
    </PaperProvider>
  );
};

export default Meal;
