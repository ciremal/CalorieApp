import { StyleSheet } from "react-native";

export const mealsHomeStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
    paddingBottom: 100,
  },

  addMealButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  calendarButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
