import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },

  divider: {
    backgroundColor: "black",
  },

  body: {
    backgroundColor: "white",
    flex: 1,
  },

  raisedStyle: {
    shadowOpacity: 0.4,
    shadowRadius: 1,
    backgroundColor: "#fff",
    shadowOffset: { height: 1 },
    elevation: 2,
  },
});

export default styles;
