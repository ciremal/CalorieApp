import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const FormStyles = StyleSheet.create({
  grid: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.orange.text,
    display: "flex",
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    margin: 1,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    marginTop: 5,
    borderColor: Colors.orange.text,
    fontSize: 20,
    borderRadius: 12,
    color: Colors.lightOrange.text,
    width: "100%",
  },
  textInputDropdown: {
    borderRadius: 0,
  },
  selectedItems: {
    borderRadius: 12,
    borderColor: Colors.orange.text,
  },
  containerList: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  dropDownItem: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
});
