import React from "react";
import { Calendar } from "react-native-calendars";
import { Modal, Portal } from "react-native-paper";
import { modalStyles } from "./ModalStyles";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";

type CalendarModelProps = {
  calendarVisible: boolean;
  hideCalendar: () => void;
  handleDateSelection: (day: any) => void;
  currentDate: string;
  selectedDate: string;
};

const CalendarModal = ({
  calendarVisible,
  hideCalendar,
  handleDateSelection,
  currentDate,
  selectedDate,
}: CalendarModelProps): JSX.Element => {
  return (
    <>
      <Portal>
        <Modal
          visible={calendarVisible}
          onDismiss={hideCalendar}
          contentContainerStyle={modalStyles.modal}
        >
          <View style={modalStyles.modalContentContainer}>
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
  );
};

export default CalendarModal;
