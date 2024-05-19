import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const searchFoodStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },

  addMealButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
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
  },
  searchInputContainer: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  textInput: {
    width: "90%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: Colors.black.text,
    borderRadius: 50,
    paddingVertical: 13,
    paddingHorizontal: 15,
    color: Colors.black.text,
    fontSize: 18,
    borderWidth: 0.8,
  },

  searchInputIcon: {
    position: "absolute",
  },

  searchSuggestions: {
    display: "flex",
    width: "100%",
    marginTop: 15,
  },
});
