import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const deleteDialogStyles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.lightWhite.text,
  },

  dialogButton: {
    borderColor: Colors.black.text,
    borderRadius: 5,
  },
});
