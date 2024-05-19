import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Divider, Button, Text, Portal, Modal } from "react-native-paper";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { mealsStyles as pageStyles } from "./mealSummaryStyles";
import styles from "../../styles/general";
import Totals from "../../components/Totals/Totals";
import { useState, useEffect } from "react";
import { SIZES } from "../../constants/sizes";
import FoodItemBox from "../../components/FoodItemBox/FoodItemBox";
import { FlatList } from "react-native";

const MealSummary = () => {
  const router = useRouter();
  const { mealName, newMeal } = useLocalSearchParams();
  const [visible, setVisible] = useState(false);

  const [meals, setMeals] = useState([]);
  const [mealsTotals, setMealsTotals] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (newMeal) {
      setMeals([...meals, JSON.parse(newMeal)]);
      hideModal();
    }
  }, [newMeal]);

  useEffect(() => {
    const result = meals.map((item) => item.mainNutrients);
    setMealsTotals(result);
  }, [meals]);

  return (
    <SafeAreaView style={styles.body}>
      <Divider style={styles.divider} />
      <Stack.Screen
        options={{
          headerTitle: mealName,
          headerStyle: styles.header,
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back"
                  size={32}
                  color={Colors.orange.text}
                />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <FontAwesome
                  name="trash-o"
                  size={32}
                  color={Colors.orange.text}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View style={pageStyles.container}>
        <Totals meals={mealsTotals} />
        <FlatList
          scrollEnabled={true}
          data={meals}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FoodItemBox
                foodName={item.name}
                calories={item.mainNutrients.cals}
                fats={item.mainNutrients.fats}
                carbs={item.mainNutrients.carbs}
                proteins={item.mainNutrients.proteins}
                quantity={item.quantity}
                unit={item.unitOfMeasurement}
              />
            </View>
          )}
        />
        <Button
          mode="elevated"
          icon="plus"
          buttonColor={Colors.lightOrange.text}
          textColor={Colors.black.text}
          labelStyle={{ fontSize: 18 }}
          style={pageStyles.addFoodButton}
          onPress={() => showModal()}
        >
          Add Food
        </Button>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={pageStyles.modal}
          >
            <View style={pageStyles.modalContentContainer}>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/searchFood",
                    params: { mealName },
                  });
                }}
              >
                <View style={[pageStyles.addFoodOption, styles.raisedStyle]}>
                  <AntDesign name="search1" size={SIZES.xxlg} color="black" />
                  <Text style={pageStyles.addFoodOptionText}>Search</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={[pageStyles.addFoodOption, styles.raisedStyle]}>
                  <Entypo name="pencil" size={SIZES.xxlg} color="black" />
                  <Text style={pageStyles.addFoodOptionText}>Manual</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

export default MealSummary;
