import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Divider, PaperProvider } from "react-native-paper";
import styles from "../../styles/general";
import { Stack } from "expo-router";
import { foodNutritionEditManualStyles as pageStyles } from "../FoodNutritionEditManual/FoodNutrtionEditManualStyles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useUpdateMealAddFoodItem } from "@/api/meals";
import { useMutation, useQueryClient } from "react-query";
import { MealContext } from "@/hooks/useMealContext";
import FoodNutritonManualForm from "@/components/Forms/FoodNutritionManualForm";
import { allNutrients, unitOfMeasurements } from "@/constants/nutrients";

const FoodNutritionEditManual = () => {
  const { selectedMeal } = useContext(MealContext);

  const navigation = useNavigation();

  const nutrients = allNutrients.map((item) => item);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: useUpdateMealAddFoodItem,
    onSuccess: async () => {
      await queryClient.refetchQueries();
      navigation.navigate("Meal Summary");
    },
  });

  const handleAddFood = (values: any) => {
    const { foodName, quantity, notes, unitOfMeasurement } = values;
    const keys = Object.keys(values);
    const selectedNutrients = nutrients
      .filter((item) => keys.includes(item.label))
      .map((item) => {
        return {
          label: item.label,
          quantity: parseFloat(values[item.label]),
          unit: item.unit,
        };
      });

    const mainNutrients = {
      cals: selectedNutrients.find((item) => item.label === "Calories")
        .quantity,
      fats: selectedNutrients.find((item) => item.label === "Fats").quantity,
      carbs: selectedNutrients.find((item) => item.label === "Carbs").quantity,
      proteins: selectedNutrients.find((item) => item.label === "Proteins")
        .quantity,
    };

    const foodItem = {
      name: foodName,
      quantity: quantity,
      unitOfMeasurement: unitOfMeasurement.label,
      nutrients: selectedNutrients,
      notes: notes,
      mainNutrients: mainNutrients,
    };

    mutate({
      id: selectedMeal._id,
      foodItem: foodItem,
      mainNutrients: mainNutrients,
    });
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <Divider style={styles.divider} />
        <Stack.Screen
          options={{
            headerTitle: selectedMeal.title,
            headerStyle: styles.header,
            headerBackVisible: false,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="arrow-back"
                    size={32}
                    color={Colors.orange.text}
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
        <KeyboardAwareScrollView>
          <View style={pageStyles.container}>
            <FoodNutritonManualForm
              handleAddFood={handleAddFood}
              mealName={selectedMeal.title}
              measures={unitOfMeasurements}
              allNutrients={nutrients}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FoodNutritionEditManual;
