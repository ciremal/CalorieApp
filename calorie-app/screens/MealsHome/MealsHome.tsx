import {
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Text,
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
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState, Key } from "react";
import Totals from "../../components/Totals/Totals";
import { useCreateMeal, useGetMeals } from "../../api/meals";
import { useMutation } from "react-query";

const MealsHome = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [mealName, setMealName] = useState("");

  const { data: meals, isFetching, error, refetch } = useGetMeals();
  console.log(error);
  const { mutate } = useMutation({
    mutationFn: useCreateMeal,
    onSuccess: () => {
      hideModal();
      setMealName("");
      refetch();
    },
  });

  const addMeal = async (title: string): Promise<void> => {
    mutate(title);
  };

  const [snackbarvisible, setSnackbarVisible] = useState(true);

  const onToggleSnackBar = () => setSnackbarVisible(!visible);

  const onDismissSnackBar = () => setSnackbarVisible(false);

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
          {isFetching && (
            <ActivityIndicator animating={true} color={Colors.orange.text} />
          )}
          {meals && (
            <>
              <Totals meals={meals} />
              {meals.map(
                (meal: {
                  title: Key | null | undefined;
                  fats: any;
                  carbs: any;
                  proteins: any;
                  cals: any;
                }) => (
                  <MealBox
                    mealName={meal.title}
                    fats={meal.fats}
                    carbs={meal.carbs}
                    proteins={meal.proteins}
                    calories={meal.cals}
                    key={meal.title}
                  />
                )
              )}
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
                      onPress={() => addMeal(mealName)}
                    >
                      Add
                    </PaperButton>
                  </View>
                </Modal>
              </Portal>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealsHome;
