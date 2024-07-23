import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: "25%",
    shadowOpacity: 0.6,
    shadowOffset: { height: 1 },
    shadowRadius: 8,
    shadowColor: Colors.orange.text,
  },

  linearGradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  avatarContainer: {
    backgroundColor: Colors.lightOrange.text,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
  },

  dividerTop: {
    width: "100%",
    borderColor: Colors.orange.text,
    borderWidth: 0.5,
    marginTop: "5%",
  },

  dividerBottom: {
    width: "100%",
    borderColor: Colors.orange.text,
    borderWidth: 0.5,
    marginBottom: "5%",
  },

  infoTitle: {
    fontSize: SIZES.xl,
    fontWeight: "600",
  },

  personalInfoContainer: {
    width: "90%",
    display: "flex",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    rowGap: "10%",
    borderRadius: 12,
    borderStyle: "solid",
    shadowOpacity: 0.5,
    shadowOffset: { height: 0.5 },
    shadowRadius: 2,
    shadowColor: Colors.black.text,
    backgroundColor: Colors.lightWhite.text,
  },
  personalInfoTitleContainer: {
    marginBottom: "5%",
  },
  personalInfoRowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  personalInfoItemText: {
    fontSize: SIZES.md,
  },

  myWeightContainer: {
    width: "90%",
    paddingHorizontal: "10%",
    paddingVertical: "10%",
    rowGap: "10%",
    borderRadius: 12,
    borderStyle: "solid",
    shadowOpacity: 0.5,
    shadowOffset: { height: 0.5 },
    shadowRadius: 2,
    shadowColor: Colors.black.text,
    backgroundColor: Colors.lightWhite.text,
  },
  myWeightProgressBarContainer: {
    width: "100%",
    rowGap: 5,
  },
  myWeightProgressBarNumbersContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  myWeightProgressBarNumbers: {
    fontSize: SIZES.md,
  },
});
