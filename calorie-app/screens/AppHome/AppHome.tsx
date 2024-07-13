import { View, TouchableOpacity, Text } from "react-native";
import { AppHomeStyles as pageStyles } from "./AppHomeStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

const AppHome = () => {
  const navigation = useNavigation();

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
        <View style={pageStyles.container}>
          <Text style={pageStyles.header}>Welcome</Text>
          <View style={pageStyles.buttonContainer}>
            <TouchableOpacity
              style={pageStyles.button}
              onPress={() => navigation.navigate("Sign Up Screen")}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  pageStyles.buttonText,
                  { color: Colors.lightWhite.text },
                ]}
              >
                SIGN UP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                pageStyles.button,
                {
                  backgroundColor: Colors.lightWhite.text,
                  borderColor: Colors.lightWhite.text,
                },
              ]}
              onPress={() => navigation.navigate("Sign In Screen")}
              activeOpacity={0.6}
            >
              <Text
                style={[pageStyles.buttonText, { color: Colors.black.text }]}
              >
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AppHome;
