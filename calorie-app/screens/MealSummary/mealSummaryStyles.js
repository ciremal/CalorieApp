import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const mealsStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "8%",
    marginBottom: "15%",
  },
  addFoodButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 15,
  },
  modal: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    marginBottom: "40%",
    borderRadius: "10%",
  },

  modalContentContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    rowGap: "15%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  addFoodOption: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.orange.text,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 3,
  },

  addFoodOptionText: {
    color: Colors.black.text,
    fontSize: 18,
  },
});
