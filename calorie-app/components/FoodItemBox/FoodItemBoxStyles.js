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
  notesDropdownButton: {
    backgroundColor: Colors.lightOrange.text,
    paddingHorizontal: "7%",
    paddingVertical: "4%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notesDropdownContainer: {
    backgroundColor: Colors.lightOrange.text,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notesDropdown: {
    width: "90%",
    paddingVertical: "5%",
    paddingHorizontal: "8%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  notesDropdownEditIcon: {
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notes: {
    backgroundColor: Colors.lightOrange.text,
    paddingLeft: "10%",
    color: Colors.lightWhite.text,
    fontStyle: "italic",
    fontSize: SIZES.md,
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
  roundedCornersTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  roundedCornersBottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
