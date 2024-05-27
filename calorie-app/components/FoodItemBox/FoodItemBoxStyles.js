import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";

export const foodItemBoxStyles = StyleSheet.create({
  foodBox: {
    width: "90%",
    marginVertical: "3%",
  },
  foodBoxLayer1: {
    backgroundColor: Colors.lightOrange.text,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodBoxLayer2: {
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
  foodItemTitle: {
    color: Colors.lightWhite.text,
    fontSize: 18,
    fontWeight: "600",
    flexWrap: "wrap",
    flexDirection: "row",
    maxWidth: "80%",
  },
  dialog: {
    backgroundColor: Colors.lightWhite.text,
  },

  dialogButton: {
    borderColor: Colors.black.text,
    borderRadius: 5,
  },
});
