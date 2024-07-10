import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { Stack } from "expo-router";
import {
  mealsHomeStyles,
  mealsHomeStyles as pageStyles,
} from "./MealsHomeStyles";
import styles from "../../styles/general";
import MealBox from "../../components/MealBox/MealBox";
import { Divider, ActivityIndicator } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import Totals from "../../components/Totals/Totals";
import { useCreateMeal, useGetMealsByDate } from "../../api/meals";
import { useMutation } from "react-query";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { Feather, Entypo } from "@expo/vector-icons";
import { dateToday, dateYesterday } from "@/helpers/dates";
import CalendarModal from "@/components/Modals/CalendarModal";
import CreateMealModal from "@/components/Modals/CreateMealModal";
import MealHomeSummary from "@/components/Charts/MealHomeSummary";
import { SIZES } from "@/constants/sizes";
import { getTotalNutrient } from "@/helpers/getNutrientStats";
import roundNumbers from "@/helpers/roundNumbers";
import * as OpenAnything from "react-native-openanything";

const MealsHome = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const showCalendar = () => setCalendarVisible(true);
  const hideCalendar = () => setCalendarVisible(false);

  const currentDate = dateToday;
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const {
    data: meals,
    isFetching,
    error,
    refetch,
  } = useGetMealsByDate(selectedDate);

  const totalCals = getTotalNutrient("cals", meals);

  const { mutate } = useMutation({
    mutationFn: useCreateMeal,
    onSuccess: () => {
      hideModal();
      refetch();
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const addMeal = async (title: string): Promise<void> => {
    mutate({ title: title, createdAt: selectedDate });
  };

  const handleDateSelection = (day: any) => {
    setSelectedDate(day.dateString);
    hideCalendar();
  };

  // const getDRIResults = (nutrient: string) => {
  //   const DRI = {
  //     cals: {
  //       lower: 1900,
  //       upper: 2100,
  //     },
  //     fats: {
  //       lower: 125,
  //       upper: 175,
  //     },
  //     carbs: {
  //       lower: 215,
  //       upper: 285,
  //     },
  //     proteins: {
  //       lower: 90,
  //       upper: 110,
  //     },
  //   };
  //   if (
  //     getTotalNutrient(nutrient, meals) >= DRI[nutrient].lower &&
  //     getTotalNutrient(nutrient, meals) <= DRI[nutrient].upper
  //   ) {
  //     return "In range of recommended";
  //   } else if (
  //     getTotalNutrient(nutrient, meals) >= 0.9 * DRI[nutrient].lower &&
  //     getTotalNutrient(nutrient, meals) < DRI[nutrient].lower
  //   ) {
  //     return "Slightly under recommended";
  //   } else if (
  //     getTotalNutrient(nutrient, meals) <= 1.1 * DRI[nutrient].upper &&
  //     getTotalNutrient(nutrient, meals) > DRI[nutrient].upper
  //   ) {
  //     return "Slightly above recommended";
  //   } else if (getTotalNutrient(nutrient, meals) > 1.1 * DRI[nutrient].upper) {
  //     return "Above the recommended";
  //   } else {
  //     return "Under the recommended";
  //   }
  // };

  const getDRI = (
    nutrient: string,
    weight: number,
    height: number,
    gender: string,
    age: number
  ) => {
    if (nutrient === "carbs") {
      const PA = gender === "male" ? 1.11 : 1.12;
      const EER =
        gender === "male"
          ? roundNumbers(
              662 - 9.53 * age + PA * (15.91 * weight + 539.6 * height)
            )
          : roundNumbers(
              354 - 6.91 * age + PA * (9.36 * weight + 726 * height)
            );
      return `${roundNumbers((0.45 * EER) / 4)} - ${roundNumbers(
        (0.65 * EER) / 4
      )}`;
    } else if (nutrient === "proteins") {
      return roundNumbers(0.8 * weight);
    } else if (nutrient === "fats") {
      const PA = gender === "male" ? 1.11 : 1.12;
      const EER =
        gender === "male"
          ? roundNumbers(
              662 - 9.53 * age + PA * (15.91 * weight + 539.6 * height)
            )
          : roundNumbers(
              354 - 6.91 * age + PA * (9.36 * weight + 726 * height)
            );
      return `${roundNumbers((0.2 * EER) / 9)} - ${roundNumbers(
        (0.35 * EER) / 9
      )}`;
    } else {
      return 0;
    }
  };

  const getAMDR = (nutrient: string, cals: number) => {
    switch (nutrient) {
      case "fats":
        return `${roundNumbers((cals * 0.2) / 9)}-${roundNumbers(
          (cals * 0.35) / 9
        )} grams`;
      case "proteins":
        return `${roundNumbers((cals * 0.1) / 4)}-${roundNumbers(
          (cals * 0.35) / 4
        )} grams`;
      case "carbs":
        return `${roundNumbers((cals * 0.45) / 4)}-${roundNumbers(
          (cals * 0.65) / 4
        )} grams`;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <Divider style={styles.divider} />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <TouchableOpacity
              onPress={() => showCalendar()}
              style={mealsHomeStyles.calendarButton}
            >
              <Text style={{ fontSize: 18 }}>
                {selectedDate === currentDate
                  ? "Today"
                  : selectedDate === dateYesterday
                  ? "Yesterday"
                  : selectedDate}
              </Text>
              <Entypo name="triangle-down" size={18} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => showModal()}>
                <Feather name="plus" size={32} color={Colors.orange.text} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <ScrollView>
        <View style={pageStyles.container}>
          {error && (
            <ErrorAlert
              message={"Could not load meals. Please try again later"}
            />
          )}
          {isFetching && !meals && (
            <ActivityIndicator animating={true} color={Colors.orange.text} />
          )}
          {meals && (
            <>
              <Totals meals={meals} />
              {meals.map((meal: any) => (
                <MealBox meal={meal} key={meal.title} />
              ))}

              {totalCals > 0 && (
                <View style={{ marginVertical: "10%", width: "90%" }}>
                  <View style={{ marginVertical: 15, rowGap: 6 }}>
                    <Text style={{ fontSize: SIZES.lg, fontWeight: "600" }}>
                      Summary
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: SIZES.md }}>
                        Calories Remaining
                      </Text>
                      <Text style={{ fontSize: SIZES.md }}>
                        {totalCals >= 2000 ? 0 : roundNumbers(2000 - totalCals)}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: SIZES.md }}>
                        Calories Consumed
                      </Text>
                      <Text style={{ fontSize: SIZES.md, fontWeight: "600" }}>
                        {totalCals}
                      </Text>
                    </View>
                    <Divider style={{ backgroundColor: "black", height: 1 }} />
                    <Text
                      style={{
                        fontSize: SIZES.md,
                        textAlign: "right",
                        fontStyle: "italic",
                      }}
                    >
                      2000
                    </Text>
                  </View>

                  <MealHomeSummary meals={meals} />

                  <View style={{ marginTop: 10, rowGap: 6 }}>
                    <Text style={{ fontSize: SIZES.lg, fontWeight: "600" }}>
                      Daily Recommended Intakes
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: SIZES.md }}>Fats:</Text>
                      <Text style={{ fontSize: SIZES.md }}>
                        {`${getDRI("fats", 65, 1.6764, "male", 21)} grams`}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: SIZES.md }}>Carbs:</Text>
                      <Text style={{ fontSize: SIZES.md }}>
                        {`${getDRI("carbs", 65, 1.6764, "male", 21)} grams`}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: SIZES.md }}>Proteins:</Text>
                      <Text style={{ fontSize: SIZES.md }}>
                        {`${getDRI("proteins", 65, 1.6764, "male", 21)} grams`}
                      </Text>
                    </View>

                    <View style={{ marginTop: 10, rowGap: 6 }}>
                      <Text
                        style={{
                          fontSize: SIZES.md,
                          fontStyle: "italic",
                        }}
                      >
                        These ranges are calculated based on DRI Reference
                        Values for Macronutrients. You can find the information{" "}
                        <Text
                          onPress={() =>
                            OpenAnything.Pdf(
                              "https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/fn-an/alt_formats/hpfb-dgpsa/pdf/nutrition/dri_tables-eng.pdf"
                            )
                          }
                          style={{
                            color: "blue",
                            textDecorationLine: "underline",
                          }}
                        >
                          here
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <CreateMealModal
                visible={visible}
                hideModal={hideModal}
                onSubmit={addMeal}
              />

              <CalendarModal
                calendarVisible={calendarVisible}
                hideCalendar={hideCalendar}
                handleDateSelection={handleDateSelection}
                currentDate={currentDate}
                selectedDate={selectedDate}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealsHome;
