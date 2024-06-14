import { View, Text } from "react-native";
import { alertsStyles } from "./AlertsStyles.js";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export const ErrorAlert = (props: { message: String }) => {
  return (
    <View style={alertsStyles.alertContainer}>
      <Entypo name="warning" size={24} color="red" />
      <Text style={alertsStyles.alertMessage}>{props.message}</Text>
    </View>
  );
};

export const EmptySearchResult = (props: { message: String }) => {
  return (
    <View style={alertsStyles.emptySearchContainer}>
      <MaterialCommunityIcons
        name="clipboard-search-outline"
        size={125}
        color={Colors.orange.text}
      />
      <Text style={alertsStyles.emptySearchMessage}>{props.message}</Text>
    </View>
  );
};

export const SomethingWentWrong = (props: { message: String }) => {
  return (
    <View style={alertsStyles.emptySearchContainer}>
      <FontAwesome6 name="sad-tear" size={125} color="black" />
      <Text style={alertsStyles.emptySearchMessage}>{props.message}</Text>
    </View>
  );
};
