import { SafeAreaView, View, TouchableOpacity } from "react-native";
import {
  Divider,
  Button,
  Text,
  Portal,
  Modal,
  ActivityIndicator,
  Dialog,
} from "react-native-paper";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { mealsStyles as pageStyles } from "./MealSummaryStyles";
import styles from "../../styles/general";
import Totals from "../../components/Totals/Totals";
import { useState, useEffect } from "react";
import { SIZES } from "../../constants/sizes";
import FoodItemBox from "../../components/FoodItemBox/FoodItemBox";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { useDeleteFoodItem, useDeleteMeal, useGetMealById } from "@/api/meals";
import { ErrorAlert } from "@/components/Alerts/Alerts";

const MealSummary = () => {
  const router = useRoute();
  const navigation = useNavigation();

  const { meal } = router.params;
  const { _id: id, title, createdAt } = meal;

  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const [visibleDialogMeal, setVisibleDialogMeal] = useState(false);
  const showDialogMeal = () => setVisibleDialogMeal(true);
  const hideDialogMeal = () => setVisibleDialogMeal(false);

  const [mealsTotals, setMealsTotals] = useState([]);

  const queryClient = useQueryClient();
  const { data: mealData, isFetching, error, refetch } = useGetMealById(id);

  const { mutate } = useMutation({
    mutationFn: useDeleteMeal,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getMealsByDate", createdAt],
        active: true,
      });
      navigation.navigate("Meal Home");
    },
  });

  const { mutate: deleteFoodItem } = useMutation({
    mutationFn: useDeleteFoodItem,
    onSuccess: async () => {
      refetch(id);
      await queryClient.refetchQueries({
        queryKey: ["getMealsByDate", createdAt],
        active: true,
      });
    },
  });

  const handleDelete = (foodId, hideDialog) => {
    deleteFoodItem({ mealId: id, foodId: foodId });
    hideDialog();
  };

  useEffect(() => {
    if (mealData) {
      const result = mealData.foodItems.map((item) => item.mainNutrients);
      setMealsTotals(result);
    }
  }, [mealData]);

  return (
    <SafeAreaView style={styles.body}>
      <Divider style={styles.divider} />
      <Stack.Screen
        options={{
          headerTitle: title,
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
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => showDialogMeal()}>
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
        {error && (
          <ErrorAlert
            message={"Could not load meals. Please try again later"}
          />
        )}
        {isFetching && (
          <ActivityIndicator animating={true} color={Colors.orange.text} />
        )}
        {mealData && (
          <>
            <Totals meals={mealsTotals} />
            <FlatList
              scrollEnabled={true}
              data={mealData.foodItems}
              style={{ width: "100%" }}
              renderItem={({ item }) => (
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FoodItemBox foodItem={item} handleDelete={handleDelete} />
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
              contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
              onPress={() => showModal()}
            >
              Add Food
            </Button>

            <Portal>
              <Modal
                visible={visibleModal}
                onDismiss={hideModal}
                contentContainerStyle={pageStyles.modal}
              >
                <View style={pageStyles.modalContentContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Search Food", { meal: meal });
                      hideModal();
                    }}
                  >
                    <View
                      style={[pageStyles.addFoodOption, styles.raisedStyle]}
                    >
                      <AntDesign
                        name="search1"
                        size={SIZES.xl3}
                        color="black"
                      />
                      <Text style={pageStyles.addFoodOptionText}>Search</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={[pageStyles.addFoodOption, styles.raisedStyle]}
                    >
                      <Entypo name="pencil" size={SIZES.xl3} color="black" />
                      <Text style={pageStyles.addFoodOptionText}>Manual</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
            </Portal>

            <Portal>
              <Dialog
                visible={visibleDialogMeal}
                onDismiss={hideDialogMeal}
                style={pageStyles.dialog}
              >
                <Dialog.Title
                  style={{
                    fontSize: SIZES.lg,
                    fontWeight: "bold",
                    color: Colors.black.text,
                  }}
                >
                  Are you sure you want to delete this meal?
                </Dialog.Title>
                <Dialog.Content>
                  <Text
                    variant="bodyLarge"
                    style={{ color: Colors.black.text }}
                  >
                    This meal will be deleted permanently. You cannot undo this
                    action.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    mode="outlined"
                    buttonColor={Colors.lightWhite.text}
                    textColor={Colors.black.text}
                    style={pageStyles.dialogButton}
                    contentStyle={{ paddingHorizontal: "6%" }}
                    onPress={hideDialogMeal}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="outlined"
                    buttonColor={Colors.red.text}
                    textColor={Colors.lightWhite.text}
                    style={pageStyles.dialogButton}
                    contentStyle={{ paddingHorizontal: "6%" }}
                    onPress={() => mutate(id)}
                  >
                    Delete
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MealSummary;
