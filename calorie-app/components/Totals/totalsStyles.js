import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/sizes";

const totalsStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "5%",
    width: "90%",
  },
  totalsStyles: {
    flexDirection: "column",
    alignContent: "center",
  },
  textStyles: {
    textAlign: "center",
    fontSize: SIZES.md,
  },
  textStylesCals: {
    textAlign: "center",
    fontSize: SIZES.md,
    fontWeight: "bold",
  },
});

export default totalsStyles;
