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
import { useCreateMeal, useGetMealsByDateAndUser } from "../../api/meals";
import { useMutation } from "react-query";
import { CompleteProfile, ErrorAlert } from "@/components/Alerts/Alerts";
import { Feather, Entypo } from "@expo/vector-icons";
import { dateToday, dateYesterday, getAge } from "@/helpers/dates";
import CalendarModal from "@/components/Modals/CalendarModal";
import CreateMealModal from "@/components/Modals/CreateMealModal";
import MealHomeSummary from "@/components/Charts/MealHomeSummary";
import { SIZES } from "@/constants/sizes";
import { getTotalNutrient } from "@/helpers/getNutrientStats";
import roundNumbers from "@/helpers/roundNumbers";
import * as OpenAnything from "react-native-openanything";
import { getAuth } from "firebase/auth";
import { useGetUserById } from "@/api/user";
import { useNavigation } from "@react-navigation/native";
import {
  formatAMDR,
  getAMDRCarbs,
  getAMDRFat,
  getRDAProtein,
} from "@/helpers/nutrientsHelpers";

const MealsHome = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const showCalendar = () => setCalendarVisible(true);
  const hideCalendar = () => setCalendarVisible(false);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const currentDate = dateToday;
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const {
    data: meals,
    isFetching,
    error,
    refetch,
  } = useGetMealsByDateAndUser(selectedDate, user?.uid);

  const {
    data: userData,
    isFetching: isFetchingUserData,
    error: errorUserData,
  } = useGetUserById(user?.uid);

  const totalCals = getTotalNutrient("cals", meals);

  const { mutate } = useMutation({
    mutationFn: useCreateMeal,
    onSuccess: () => {
      hideModal();
      setLoadingSubmit(false);
      refetch();
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const addMeal = async (title: string): Promise<void> => {
    setLoadingSubmit(true);
    mutate({ title: title, user: user?.uid, createdAt: selectedDate });
  };

  const handleDateSelection = (day: any) => {
    setSelectedDate(day.dateString);
    hideCalendar();
  };

  const navigateToCompleteForm = () => {
    navigation.navigate("Profile");
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
          {error && errorUserData && (
            <ErrorAlert
              message={"Could not load meals. Please try again later"}
            />
          )}
          {isFetching && !meals && isFetchingUserData && !userData && (
            <ActivityIndicator animating={true} color={Colors.orange.text} />
          )}
          {meals && user && userData && (
            <>
              {userData.profileComplete ? (
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
                            {totalCals >= userData.calorieGoal
                              ? 0
                              : roundNumbers(userData.calorieGoal - totalCals)}
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
                          <Text
                            style={{ fontSize: SIZES.md, fontWeight: "600" }}
                          >
                            {totalCals}
                          </Text>
                        </View>
                        <Divider
                          style={{ backgroundColor: "black", height: 1 }}
                        />
                        <Text
                          style={{
                            fontSize: SIZES.md,
                            textAlign: "right",
                            fontStyle: "italic",
                          }}
                        >
                          {userData.calorieGoal}
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
                            {formatAMDR(
                              getAMDRFat(
                                getAge(userData.DOB),
                                userData.gender,
                                userData.PA,
                                userData.currentWeight,
                                userData.height
                              )
                            )}
                            g
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
                            {formatAMDR(
                              getAMDRCarbs(
                                getAge(userData.DOB),
                                userData.gender,
                                userData.PA,
                                userData.currentWeight,
                                userData.height
                              )
                            )}
                            g
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
                            {getRDAProtein(
                              userData.currentWeight,
                              getAge(userData.DOB)
                            )}
                            g
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
                            Values for Macronutrients. You can find the
                            information{" "}
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
                    loadingSubmit={loadingSubmit}
                  />

                  <CalendarModal
                    calendarVisible={calendarVisible}
                    hideCalendar={hideCalendar}
                    handleDateSelection={handleDateSelection}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                  />
                </>
              ) : (
                <CompleteProfile
                  message={"Complete your profile to get started"}
                  handlePress={navigateToCompleteForm}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealsHome;
