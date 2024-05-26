import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { extractNutrientsFromApi } from "../../helpers/nutrientsHelpers";
import roundNumbers from "../../helpers/roundNumbers";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUpdateMealAddFoodItem } from "@/api/meals";
import { useMutation, useQueryClient } from "react-query";

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
  const [foodName, setFoodName] = useState(name);
  const [quantity, setQuantity] = useState(apiDefaults.quantity);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("Gram");
  const [nutrients, setNutrients] = useState([]);
  const [notes, setNotes] = useState("");

  const { data, isLoading, error } = useFetchSpecificFood(
    foodId,
    100,
    measureId
  );

  const [defaultNutrients, setDefaultNutrients] = useState();
  const [measures, setMeasures] = useState(JSON.parse(measureOptions));

  useEffect(() => {
    if (
      !isLoading &&
      data.totalNutrients !== undefined &&
      data.ingredients !== undefined
    ) {
      setNutrients(extractNutrientsFromApi(data.totalNutrients));
      setDefaultNutrients(extractNutrientsFromApi(data.totalNutrients));
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

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: useUpdateMealAddFoodItem,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getMealById", meal._id],
        active: true,
      });
      navigation.navigate("Meal Summary", {
        meal: meal,
      });
    },
  });

  const handleAddFood = () => {
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
              <View
                style={{ width: "95%", rowGap: 12 }}
                id="food-item-name-input"
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 18, marginLeft: 5 }}>Name</Text>
                  <TextInput
                    style={pageStyles.textInput}
                    value={foodName}
                    onChangeText={setFoodName}
                  />
                </View>
                <View
                  style={{ paddingHorizontal: 10 }}
                  id="food-item-quantity-input"
                >
                  <Text style={{ fontSize: 18, marginLeft: 5 }}>Quantity</Text>
                  <TextInput
                    inputMode="numeric"
                    style={pageStyles.textInput}
                    defaultValue={quantity.toString()}
                    value={quantity.toString()}
                    onChangeText={setQuantity}
                  />
                </View>
                <View
                  style={{ paddingHorizontal: 10 }}
                  id="unit-of-measurement-dropdown"
                >
                  <Text style={{ fontSize: 18, marginLeft: 5 }}>
                    Unit of Measurement
                  </Text>
                  <SelectDropdown
                    data={measures.map((item) => item.label)}
                    onSelect={(selectedItem) =>
                      setUnitOfMeasurement(selectedItem)
                    }
                    defaultButtonText="Gram"
                    buttonTextAfterSelection={(selectedItem) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                      return item;
                    }}
                    renderDropdownIcon={() => {
                      return (
                        <AntDesign name="caretdown" size={24} color="black" />
                      );
                    }}
                    buttonStyle={pageStyles.textInput}
                    buttonTextStyle={{
                      color: Colors.lightOrange.text,
                      textAlign: "left",
                    }}
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
                    value={notes}
                    onChangeText={setNotes}
                  />
                </View>
                <PaperButton
                  mode="contained"
                  textColor={Colors.black.text}
                  buttonColor={Colors.lightOrange.text}
                  labelStyle={{ fontSize: 18 }}
                  onPress={() => handleAddFood()}
                >
                  Add to {meal.title}
                </PaperButton>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FoodNutritionEdit;
