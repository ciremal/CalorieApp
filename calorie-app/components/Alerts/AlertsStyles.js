import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";
import { Dimensions } from "react-native";

const middle = Dimensions.get("window").width;

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
  alertMessage: {
    fontSize: SIZES.md,
    color: Colors.black.text,
  },
  emptySearchContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: middle,
    marginTop: 15,
    rowGap: 5,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  emptySearchMessage: {
    fontSize: SIZES.md,
    textAlign: "center",
    color: Colors.black.text,
  },
});
