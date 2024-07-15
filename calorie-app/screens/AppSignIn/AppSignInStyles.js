import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { StyleSheet } from "react-native";

export const AppSignInStyles = StyleSheet.create({
  signInHeaderContainer: {
    width: "100%",
    height: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  signInFormContainer: {
    backgroundColor: Colors.lightWhite.text,
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  linearGradient: {
    flex: 1,
  },

  header: {
    fontSize: SIZES.xl3,
    fontWeight: "600",
    color: Colors.lightWhite.text,
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    rowGap: "15%",
  },

  button: {
    width: "75%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.black.text,
    paddingVertical: "4%",
  },

  buttonText: {
    textAlign: "center",
    fontSize: SIZES.lg,
  },
});
