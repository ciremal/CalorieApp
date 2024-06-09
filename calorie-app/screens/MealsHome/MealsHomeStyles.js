import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const mealsHomeStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
  },

  addMealButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  modal: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    marginBottom: "40%",
    borderRadius: "10%",
  },

  modalContentContainer: {
    width: "100%",
    display: "flex",
    rowGap: "10%",
    padding: 20,
  },

  textInput: {
    width: "100%",
    backgroundColor: "white",
    borderColor: Colors.orange.text,
  },

  calendarButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
