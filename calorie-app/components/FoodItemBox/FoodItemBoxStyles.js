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
  foodItemTitleContainer: {
    width: "70%",
    display: "flex",
    rowGap: 5,
  },
  foodItemTitle: {
    color: Colors.lightWhite.text,
    fontSize: 16,
    fontWeight: "600",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  foodItemSubTitle: {
    color: Colors.lightWhite.text,
    fontSize: SIZES.md,
    fontWeight: "600",
  },
  foodItemButtons: {
    width: "25%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  dropdownButton: {
    backgroundColor: Colors.lightOrange.text,
    paddingHorizontal: "7%",
    paddingVertical: "4%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: Colors.lightOrange.text,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingRight: '5%',
    alignItems: "center",
  },
  dropdown: {
    width: "100%",
    // width: "90%",
    paddingVertical: "5%",
    paddingHorizontal: "15%",
    display: "flex",
    rowGap: 20,
  },
  dropdownEditIcon: {
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notesContainer: {
    rowGap: 2,
  },
  notesHeader: {
    color: Colors.lightWhite.text,
    fontSize: SIZES.md,
    fontWeight: "600",
  },
  notesBody: {
    color: Colors.lightWhite.text,
    fontStyle: "italic",
    fontSize: SIZES.md,
  },
  nutrientBreakdownContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: "10%",
    alignItems: "center",
  },
  nutrientBreakdownButton: {
    fontSize: SIZES.md,
    color: Colors.lightWhite.text,
    fontWeight: "600",
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
