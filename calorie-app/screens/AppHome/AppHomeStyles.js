import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;

export const AppHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    rowGap: "25%",
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
