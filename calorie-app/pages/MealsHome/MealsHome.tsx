import {
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import { Stack } from "expo-router";
import { mealsHomeStyles as pageStyles } from "./MealsHomeStyles";
import styles from "../../styles/general";
import MealBox from "../../components/MealBox/MealBox";
import {
  Button as PaperButton,
  Modal,
  Portal,
  TextInput,
  Divider,
} from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState, useEffect } from "react";
import Totals from "../../components/Totals/Totals";
import axios from "axios";

const MealsHome = () => {
  const [meals, setMeals] = useState<any[]>([]);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [mealName, setMealName] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/getMeals")
  //     .then((meal) => {
  //       console.log(meal);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const addMeal = async (
    name: string,
    fats: number,
    carbs: number,
    proteins: number,
    cals: number
  ): Promise<void> => {
    const meal = {
      name: name,
      fats: fats,
      carbs: carbs,
      proteins: proteins,
      cals: cals,
    };
    setMeals([...meals, meal]);
    hideModal();
    setMealName("");

    // return await axios
    //   .post("http://localhost:5000/createMeal", {
    //     title: name,
    //     foodItems: [],
    //   })
    //   .then((res) => {
    //     console.log("Success");
    //     setMeals([...meals, meal]);
    //     hideModal();
    //     setMealName("");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <SafeAreaView style={styles.body}>
      <Divider style={styles.divider} />
      <Stack.Screen
        options={{
          headerStyle: styles.header,
          headerTitle: () => <Button title="Today" color={"#000000"} />,
        }}
      />
      <ScrollView>
        <View style={pageStyles.container}>
          <Totals meals={meals} />
          {meals.map((meal) => (
            <MealBox
              mealName={meal.name}
              fats={meal.fats}
              carbs={meal.carbs}
              proteins={meal.proteins}
              calories={meal.cals}
              key={meal.name}
            />
          ))}
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginVertical: "10%" }}
            onPress={() => showModal()}
          >
            <PaperButton
              mode="elevated"
              textColor={Colors.black.text}
              buttonColor={Colors.lightOrange.text}
              labelStyle={{ fontSize: 18 }}
              style={pageStyles.addMealButton}
            >
              Add Meal
            </PaperButton>
          </TouchableOpacity>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={pageStyles.modal}
            >
              <View style={pageStyles.modalContentContainer}>
                <TextInput
                  label={"Meal Name"}
                  value={mealName}
                  mode="outlined"
                  style={pageStyles.textInput}
                  outlineColor={Colors.orange.text}
                  activeOutlineColor={Colors.lightOrange.text}
                  textColor={Colors.black.text}
                  onChangeText={(text) => setMealName(text)}
                />
                <PaperButton
                  mode="contained"
                  textColor={Colors.black.text}
                  buttonColor={Colors.lightOrange.text}
                  labelStyle={{ fontSize: 18 }}
                  onPress={() => addMeal(mealName, 0, 0, 0, 0)}
                >
                  Add
                </PaperButton>
              </View>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealsHome;
