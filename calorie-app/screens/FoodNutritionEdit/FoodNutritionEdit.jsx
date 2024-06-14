import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import {
  Divider,
  PaperProvider,
  ActivityIndicator,
  Button as PaperButton,
} from "react-native-paper";
import styles from "../../styles/general";
import { Stack } from "expo-router";
import { useFetchSpecificFood } from "@/hooks/useFetchFoodData";
import { foodNutritionEditStyles as pageStyles } from "./FoodNutritionEditStyles";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";
import { apiDefaults } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { extractNutrientsFromApi } from "../../helpers/nutrientsHelpers";
import roundNumbers from "../../helpers/roundNumbers";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateMealAddFoodItem } from "@/api/meals";
import { useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";

const FoodNutritionEdit = () => {
  const navigation = useNavigation();
  const router = useRoute();

  const {
    meal,
    foodId,
    measureId,
    foodName: name,
    measureOptions,
  } = router.params;
  const [quantity, setQuantity] = useState(apiDefaults.quantity);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("Gram");
  const [nutrients, setNutrients] = useState([]);

  const [measures, setMeasures] = useState(JSON.parse(measureOptions));

  const { data, isLoading, error } = useFetchSpecificFood(
    foodId,
    100,
    measureId
  );

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

  const defaultNutrients =
    !isLoading && data.totalNutrients && data.ingredients
      ? extractNutrientsFromApi(data.totalNutrients)
      : [];

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

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: useUpdateMealAddFoodItem,
    onSuccess: async () => {
      await queryClient.refetchQueries();
      navigation.navigate("Meal Summary", {
        meal: meal,
      });
    },
  });

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

    mutate({ id: meal._id, foodItem: foodItem, mainNutrients: mainNutrients });
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <Divider style={styles.divider} />
        <Stack.Screen
          options={{
            headerTitle: meal.title,
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
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                color={Colors.lightOrange.text}
                size={SIZES.xl3}
              />
            ) : (
              <Formik
                initialValues={{
                  foodName: name,
                  quantity: quantity,
                  notes: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.foodName) {
                    errors.foodName = "Food name is required";
                  } else if (values.foodName.length > 25) {
                    errors.foodName =
                      "Food name should be between 1 and 25 characters";
                  }
                  if (!values.quantity) {
                    errors.quantity = "Quantity is required";
                  } else if (values.quantity > 9999) {
                    errors.quantity = "Quantity must be between 0 and 9999";
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  const { foodName, quantity, notes } = values;
                  handleAddFood(foodName, quantity, unitOfMeasurement, notes);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  setFieldValue,
                }) => (
                  <View
                    style={{ width: "95%", rowGap: 12 }}
                    id="food-item-name-input"
                  >
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={{ fontSize: 18, marginLeft: 5 }}>Name</Text>
                      <TextInput
                        style={pageStyles.textInput}
                        value={values.foodName}
                        onChangeText={handleChange("foodName")}
                        onBlur={handleBlur("foodName")}
                      />
                      {errors.foodName && (
                        <Text
                          style={{
                            marginBottom: 10,
                            color: Colors.red.text,
                          }}
                        >
                          {errors.foodName}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{ paddingHorizontal: 10 }}
                      id="food-item-quantity-input"
                    >
                      <Text style={{ fontSize: 18, marginLeft: 5 }}>
                        Quantity
                      </Text>
                      <TextInput
                        inputMode="decimal"
                        style={pageStyles.textInput}
                        value={values.quantity.toString()}
                        onChangeText={(e) => {
                          setFieldValue("quantity", e);
                          setQuantity(e);
                        }}
                        onBlur={handleBlur("quantity")}
                      />
                      {errors.quantity && (
                        <Text
                          style={{
                            marginBottom: 10,
                            color: Colors.red.text,
                          }}
                        >
                          {errors.quantity}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{ paddingHorizontal: 10 }}
                      id="unit-of-measurement-dropdown"
                    >
                      <Text style={{ fontSize: 18, marginLeft: 5 }}>
                        Unit of Measurement
                      </Text>
                      <Dropdown
                        data={measures}
                        labelField={"label"}
                        valueField={"label"}
                        style={pageStyles.textInput}
                        placeholderStyle={{
                          color: Colors.lightOrange.text,
                          textAlign: "left",
                          fontSize: SIZES.lg,
                        }}
                        selectedTextStyle={{
                          color: Colors.lightOrange.text,
                          textAlign: "left",
                          fontSize: SIZES.lg,
                        }}
                        onChange={(item) => {
                          setUnitOfMeasurement(item.label);
                        }}
                        search={false}
                        placeholder={unitOfMeasurement}
                      />
                    </View>
                    <View id="food-nutrition-flatlist-container">
                      <FlatList
                        scrollEnabled={false}
                        data={nutrients}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "center" }}
                        renderItem={({ item }) => (
                          <View style={pageStyles.grid}>
                            <Text>{item.label}</Text>
                            <Text>
                              {item.quantity}
                              {item.unit}
                            </Text>
                          </View>
                        )}
                        keyExtractor={(item) => item.label}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={{ fontSize: 18 }}>Notes</Text>
                      <TextInput
                        multiline={true}
                        style={[
                          pageStyles.textInput,
                          { minHeight: 100, color: Colors.black.text },
                        ]}
                        value={values.notes}
                        onChangeText={handleChange("notes")}
                        onBlur={handleBlur("notes")}
                      />
                    </View>
                    <PaperButton
                      mode="contained"
                      textColor={Colors.black.text}
                      buttonColor={Colors.lightOrange.text}
                      labelStyle={{ fontSize: 18 }}
                      onPress={() => handleSubmit()}
                    >
                      Add to {meal.title}
                    </PaperButton>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FoodNutritionEdit;
