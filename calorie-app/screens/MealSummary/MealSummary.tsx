import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Divider, Button, ActivityIndicator } from "react-native-paper";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { mealsStyles as pageStyles } from "./MealSummaryStyles";
import styles from "../../styles/general";
import Totals from "../../components/Totals/Totals";
import { useState, useEffect, useContext } from "react";
import FoodItemBox from "../../components/FoodItemBox/FoodItemBox";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { useDeleteFoodItem, useDeleteMeal, useGetMealById } from "@/api/meals";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import DeleteDialog from "@/components/DeleteDialog/DeleteDialog";
import CreateFoodItemModal from "@/components/Modals/CreateFoodItemModal";
import { MealContext } from "@/hooks/useMealContext";
import { getAuth } from "firebase/auth";

const MealSummary = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { selectedMeal } = useContext(MealContext);

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { _id: id, title, createdAt } = selectedMeal;

  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const [visibleDialogMeal, setVisibleDialogMeal] = useState(false);
  const showDialogMeal = () => setVisibleDialogMeal(true);
  const hideDialogMeal = () => setVisibleDialogMeal(false);

  const [mealsTotals, setMealsTotals] = useState([]);

  const { data: mealData, isFetching, error, refetch } = useGetMealById(id);

  const { mutate: deleteMealItem } = useMutation({
    mutationFn: useDeleteMeal,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getMealsByDateAndUser", createdAt, user?.uid],
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

  const handleDeleteMeal = (mealId: string) => {
    deleteMealItem(mealId);
  };

  const handleDeleteFoodItem = (foodId: string, hideDialog: () => void) => {
    deleteFoodItem({ mealId: id, foodId: foodId });
    hideDialog();
  };

  useEffect(() => {
    if (mealData) {
      const result = mealData.foodItems.map((item: any) => item.mainNutrients);
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
                  <FoodItemBox
                    foodItem={item}
                    handleDelete={handleDeleteFoodItem}
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
              contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
              onPress={() => showModal()}
            >
              Add Food
            </Button>

            <CreateFoodItemModal
              visible={visibleModal}
              hideModal={hideModal}
              navigation={navigation}
            />

            <DeleteDialog
              visible={visibleDialogMeal}
              hideDialog={hideDialogMeal}
              onSubmit={handleDeleteMeal}
              id={id}
              title="Are you sure you want to delete this meal?"
              warning="This meal will be deleted permanently. You cannot undo this action."
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MealSummary;
