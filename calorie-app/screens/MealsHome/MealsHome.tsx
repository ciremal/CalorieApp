import {
  View,
  ScrollView,
  TouchableOpacity,
  Button,
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
import {
  Button as PaperButton,
  Modal,
  Portal,
  TextInput,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import Totals from "../../components/Totals/Totals";
import { useCreateMeal, useGetMealsByDate } from "../../api/meals";
import { useMutation } from "react-query";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { Feather, Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { dateToday, dateYesterday } from "@/helpers/dates";

const MealsHome = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [mealName, setMealName] = useState("");

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
      setMealName("");
      refetch();
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

              <Portal>
                <Modal
                  visible={calendarVisible}
                  onDismiss={hideCalendar}
                  contentContainerStyle={pageStyles.modal}
                >
                  <View style={pageStyles.modalContentContainer}>
                    <Calendar
                      onDayPress={(day) => handleDateSelection(day)}
                      markedDates={{
                        [currentDate]: {
                          selected: true,
                          marked: true,
                          dotColor: Colors.orange.text,
                          selectedColor: "white",
                          selectedTextColor: Colors.black.text,
                        },
                        [selectedDate]: {
                          selected: true,
                          marked: false,
                          selectedColor: Colors.lightOrange.text,
                        },
                      }}
                      theme={{
                        arrowColor: Colors.orange.text,
                      }}
                    />
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
