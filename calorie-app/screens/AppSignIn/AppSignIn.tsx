import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const AppSignIn = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={[Colors.lightOrange.text, Colors.orange.text]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Sign In</Text>
      </LinearGradient>
    </View>
  );
};

export default AppSignIn;
