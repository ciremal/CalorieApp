import { View, Text, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { AppSignUpStyles as pageStyles } from "./AppSignUpStyles";
import SignUpForm from "@/components/Forms/SignUpForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SIZES } from "@/constants/sizes";
import { useNavigation } from "expo-router";

const AppSignUp = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardOpeningTime={0}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        <View
          id="sign-up-header-container"
          style={pageStyles.signUpHeaderContainer}
        >
          <Text
            style={{
              fontSize: SIZES.xl3,
              fontWeight: "600",
              color: Colors.lightWhite.text,
              marginTop: "15%",
            }}
          >
            Sign Up
          </Text>
          <Text style={{ fontSize: SIZES.lg, color: Colors.lightWhite.text }}>
            Create your account
          </Text>
        </View>
        <View
          id="sign-up-form-container"
          style={pageStyles.signUpFormContainer}
        >
          <SignUpForm />
          <View style={{ flexDirection: "row", columnGap: "8%" }}>
            <Text style={{ fontSize: SIZES.md }}>Already have an account?</Text>
            <Text
              style={{
                fontSize: SIZES.md,
                color: Colors.orange.text,
                fontWeight: "600",
              }}
              onPress={() => navigation.navigate("Sign In Screen")}
            >
              Login
            </Text>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AppSignUp;
