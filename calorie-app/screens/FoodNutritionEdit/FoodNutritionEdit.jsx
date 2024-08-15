import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Divider, PaperProvider, ActivityIndicator } from "react-native-paper";
import styles from "../../styles/general";
import { Stack } from "expo-router";
import { useFetchSpecificFood } from "@/hooks/useFetchFoodData";
import { foodNutritionEditStyles as pageStyles } from "./FoodNutritionEditStyles";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";
import { apiDefaults } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { extractNutrientsFromApi } from "../../helpers/nutrientsHelpers";
import roundNumbers from "../../helpers/roundNumbers";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateMealAddFoodItem } from "@/api/meals";
import { useMutation, useQueryClient } from "react-query";
import { SomethingWentWrong } from "@/components/Alerts/Alerts";
import FoodNutritonForm from "@/components/Forms/FoodNutritionForm";
import { MealContext } from "@/hooks/useMealContext";

const FoodNutritionEdit = () => {
  const { selectedMeal } = useContext(MealContext);

  const navigation = useNavigation();
  const router = useRoute();

  const { foodId, measureId, foodName: name, measureOptions } = router.params;
  const [quantity, setQuantity] = useState(apiDefaults.quantity);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("Gram");
  const [nutrients, setNutrients] = useState([]);

  const [measures, setMeasures] = useState(JSON.parse(measureOptions));

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { data, isLoading, error } = useFetchSpecificFood(
    foodId,
    100,
    measureId
  );

  const defaultNutrients =
    !isLoading && data.totalNutrients && data.ingredients
      ? extractNutrientsFromApi(data.totalNutrients)
      : [];

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: useUpdateMealAddFoodItem,
    onSuccess: async () => {
      await queryClient.refetchQueries();
      setLoadingSubmit(false);
      navigation.navigate("Meal Summary");
    },
  });

  useEffect(() => {
    if (
      !isLoading &&
      data.totalNutrients !== undefined &&
      data.ingredients !== undefined
    ) {
      setNutrients(extractNutrientsFromApi(data.totalNutrients));
    }
  }, [data, isLoading]);

  useEffect(() => {
    const updatedMeasures = JSON.parse(measureOptions);
    setMeasures(updatedMeasures);
  }, [measureOptions]);

  useEffect(() => {
    if (defaultNutrients) {
      const measurementWeight = measures.find(
        (item) => item.label === unitOfMeasurement
      ).weight;
      const updatedNutrients = defaultNutrients.map((nutrient) => {
        return {
          ...nutrient,
          quantity: roundNumbers(
            ((measurementWeight * quantity) / 100) * nutrient.quantity
          ),
        };
      });
      setNutrients(updatedNutrients);
    }
  }, [quantity, unitOfMeasurement]);

  const handleAddFood = (foodName, quantity, unitOfMeasurement, notes) => {
    const mainNutrients = {
      cals: nutrients.find((item) => item.label === "Calories").quantity,
      fats: nutrients.find((item) => item.label === "Fats").quantity,
      carbs: nutrients.find((item) => item.label === "Carbs").quantity,
      proteins: nutrients.find((item) => item.label === "Proteins").quantity,
    };

    const foodItem = {
      name: foodName,
      quantity: quantity,
      unitOfMeasurement: unitOfMeasurement,
      nutrients: nutrients,
      notes: notes,
      mainNutrients: mainNutrients,
    };

    setLoadingSubmit(true);

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
            {error && (
              <SomethingWentWrong
                message={
                  "Sorry... something went wrong. Please try again later"
                }
              />
            )}
            {isLoading && (
              <ActivityIndicator
                animating={true}
                color={Colors.lightOrange.text}
                size={SIZES.xl3}
              />
            )}
            {!isLoading && data && (
              <FoodNutritonForm
                name={name}
                quantity={quantity}
                setQuantity={setQuantity}
                unitOfMeasurement={unitOfMeasurement}
                setUnitOfMeasurement={setUnitOfMeasurement}
                handleAddFood={handleAddFood}
                measures={measures}
                nutrients={nutrients}
                mealName={selectedMeal.title}
                loadingSubmit={loadingSubmit}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FoodNutritionEdit;
