import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";

export const mealsStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "8%",
    marginBottom: "15%",
  },
  addFoodButton: {
    borderRadius: 50,
    marginTop: 15,
  },
});
