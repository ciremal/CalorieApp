import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Divider, PaperProvider } from "react-native-paper";
import styles from "../../styles/general";
import { Stack } from "expo-router";
import { foodNutritionEditManualStyles as pageStyles } from "../FoodNutritionEditManual/FoodNutrtionEditManualStyles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateFoodItem, useUpdateMealAddFoodItem } from "@/api/meals";
import { useMutation, useQueryClient } from "react-query";
import { MealContext } from "@/hooks/useMealContext";
import FoodNutritonManualForm from "@/components/Forms/FoodNutritionManualForm";
import { allNutrients, unitOfMeasurements } from "@/constants/nutrients";

const FoodNutritionEditManual = () => {
  const { selectedMeal } = useContext(MealContext);

  const navigation = useNavigation();
  const route = useRoute();

  const nutrients = allNutrients.map((item) => item);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateMealAddFoodItem } = useMutation({
    mutationFn: useUpdateMealAddFoodItem,
    onSuccess: async () => {
      await queryClient.refetchQueries();
      setLoadingSubmit(false);
      navigation.navigate("Meal Summary");
    },
  });

  const { mutate: mutateUpdateFoodItem } = useMutation({
    mutationFn: useUpdateFoodItem,
    onSuccess: async () => {
      await queryClient.refetchQueries();
      setLoadingSubmit(false);
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

    setLoadingSubmit(true);

    mutateUpdateMealAddFoodItem({
      id: selectedMeal._id,
      foodItem: foodItem,
      mainNutrients: mainNutrients,
    });
  };

  const handleEditFood = (
    foodItemId: string,
    values: any,
    oldMainNutrients: any
  ) => {
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

    setLoadingSubmit(true);

    mutateUpdateFoodItem({
      id: selectedMeal._id,
      foodItemId: foodItemId,
      foodItem: foodItem,
      mainNutrients: mainNutrients,
      oldMainNutrients: oldMainNutrients,
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
              handleEditFood={handleEditFood}
              mealName={selectedMeal.title}
              measures={unitOfMeasurements}
              allNutrients={nutrients}
              params={route.params}
              loadingSubmit={loadingSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FoodNutritionEditManual;
