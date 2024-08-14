import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";

export const StatsHomeStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "5%",
    rowGap: "10%",
    marginBottom: "10%",
  },
  chartInfoContainer: {
    display: "flex",
    paddingHorizontal: 15,
    rowGap: "8%",
  },

  textInput: {
    borderWidth: 1,
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    marginBottom: 12,
    marginTop: 5,
    borderColor: Colors.orange.text,
    fontSize: SIZES.md,
    borderRadius: 12,
    color: Colors.lightOrange.text,
    width: "90%",
  },
  textInputText: {
    color: Colors.orange.text,
    textAlign: "left",
    fontSize: SIZES.md,
  },

  macroFilterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5%",
  },
});
