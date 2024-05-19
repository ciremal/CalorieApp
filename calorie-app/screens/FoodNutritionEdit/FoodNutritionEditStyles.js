import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const foodNutritionEditStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    marginBottom: 100,
  },
  grid: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.orange.text,
    display: "flex",
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    margin: 1,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    marginTop: 5,
    borderRadius: 12,
    borderColor: Colors.orange.text,
    fontSize: 20,
    color: Colors.lightOrange.text,
    width: "100%",
  },
});
