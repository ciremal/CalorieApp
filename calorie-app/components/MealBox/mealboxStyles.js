import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/sizes";
import { Colors } from "@/constants/Colors";

const mealboxStyles = StyleSheet.create({
  mealBox: {
    width: "90%",
    marginVertical: "3%",
  },
  mealBoxLayer1: {
    backgroundColor: Colors.lightOrange.text,
    paddingVertical: "5%",
    paddingHorizontal: "7%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealBoxLayer2: {
    backgroundColor: Colors.orange.text,
    paddingVertical: "3%",
    paddingHorizontal: "7%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  nutritionNumber: {
    color: Colors.lightWhite.text,
    fontSize: SIZES.md,
  },
  nutritionNumberCalorie: {
    color: Colors.lightWhite.text,
    fontSize: SIZES.md,
    fontWeight: "bold",
  },
});

export default mealboxStyles;
