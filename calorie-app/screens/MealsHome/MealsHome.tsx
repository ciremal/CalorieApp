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
import { createContext, useState } from "react";
import Totals from "../../components/Totals/Totals";
import { useCreateMeal, useGetMealsByDate } from "../../api/meals";
import { useMutation } from "react-query";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { Feather, Entypo } from "@expo/vector-icons";
import { dateToday, dateYesterday } from "@/helpers/dates";
import CalendarModal from "@/components/Modals/CalendarModal";
import CreateMealModal from "@/components/Modals/CreateMealModal";

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
