import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Divider, PaperProvider, ActivityIndicator } from "react-native-paper";
import styles from "../../styles/general";
import { Stack } from "expo-router";
import { useFetchSpecificFood } from "@/hooks/useFetchFoodData";
import { foodNutritionEditManualStyles as pageStyles } from "../FoodNutritionEditManual/FoodNutrtionEditManualStyles";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";
import { apiDefaults } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  allNutrients,
  extractNutrientsFromApi,
} from "../../helpers/nutrientsHelpers";
import roundNumbers from "../../helpers/roundNumbers";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateMealAddFoodItem } from "@/api/meals";
import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong } from "@/components/Alerts/Alerts";
import FoodNutritonForm from "@/components/Forms/FoodNutritionForm";
import { MealContext } from "@/hooks/useMealContext";
import FoodNutritonManualForm from "@/components/Forms/FoodNutritionManualForm";

const FoodNutritionEditManual = () => {
  const { selectedMeal } = useContext(MealContext);

  const navigation = useNavigation();

  const measures = [
    { label: "Ounce" },
    { label: "Gram" },
    { label: "Pound" },
    { label: "Kilogram" },
    { label: "Pinch" },
    { label: "Liter" },
    { label: "Fluid ounce" },
    { label: "Gallon" },
    { label: "Pint" },
    { label: "Quart" },
    { label: "Milliliter" },
    { label: "Drop" },
    { label: "Cup" },
    { label: "Tablespoon" },
    { label: "Teaspoon" },
  ];

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
    const keys = Object.keys(values);
    const selectedNutrients = nutrients
      .filter((item) => keys.includes(item.label))
      .map((item) => {
        return {
          label: item.label,
          quantity: parseInt(values[item.label]),
          unit: item.unit,
        };
      });
    console.log(selectedNutrients);

    // selectedNutrients.forEach(
    //   (nutrient) => (nutrient.quantity = values[nutrient.label])
    // );
    // console.log(selectedNutrients);

    // const mainNutrients = {
    //   cals: nutrients.find((item) => item.label === "Calories").quantity,
    //   fats: nutrients.find((item) => item.label === "Fats").quantity,
    //   carbs: nutrients.find((item) => item.label === "Carbs").quantity,
    //   proteins: nutrients.find((item) => item.label === "Proteins").quantity,
    // };

    // const foodItem = {
    //   name: foodName,
    //   quantity: quantity,
    //   unitOfMeasurement: unitOfMeasurement,
    //   nutrients: nutrients,
    //   notes: notes,
    //   mainNutrients: mainNutrients,
    // };

    // mutate({
    //   id: selectedMeal._id,
    //   foodItem: foodItem,
    //   mainNutrients: mainNutrients,
    // });
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
              measures={measures}
              allNutrients={nutrients}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FoodNutritionEditManual;
