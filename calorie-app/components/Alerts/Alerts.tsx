import { View, Text } from "react-native";
import { alertsStyles } from "./AlertsStyles.js";
import { Entypo } from "@expo/vector-icons";

export const ErrorAlert = (props: { message: String }) => {
  return (
    <View style={alertsStyles.alertContainer}>
      <Entypo name="warning" size={24} color="red" />
      <Text style={alertsStyles.message}>{props.message}</Text>
    </View>
  );
};
