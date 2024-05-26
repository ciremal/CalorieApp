import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";

export const alertsStyles = StyleSheet.create({
  alertContainer: {
    width: "100%",
    backgroundColor: Colors.error.text,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    columnGap: 10,
  },
  message: {
    fontSize: SIZES.md,
    color: Colors.black.text,
  },
});
