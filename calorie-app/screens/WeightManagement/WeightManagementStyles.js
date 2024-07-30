import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";

export const weightManagementStyles = StyleSheet.create({
  WMContainer: {
    width: "100%",
  },
  WMCurrentWeightContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
  },
  WMCurrentWeightTextInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "10%",
  },
  WMCurrentWeightTextInput: {
    width: "45%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: Colors.orange.text,
    borderRadius: 12,
    paddingHorizontal: "5%",
    fontSize: SIZES.xl2,
    textAlign: "center",
    fontWeight: "400",
  },
  WMCurrentWeightTextInputLabel: {
    fontSize: SIZES.lg,
    fontWeight: "500",
  },

  WMWeightContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  WMWeightTextInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "10%",
  },
  WMWeightTextInput: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.orange.text,
    borderRadius: 12,
    paddingHorizontal: "5%",
    fontSize: SIZES.xl,
    textAlign: "center",
    fontWeight: "400",
  },
  WMWeightTextInputLabel: {
    fontSize: SIZES.lg,
  },

  weightHistoryContainer: {
    width: "100%",
  },
});
