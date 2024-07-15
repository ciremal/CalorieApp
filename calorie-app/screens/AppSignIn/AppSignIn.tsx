import { View, Text, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SIZES } from "@/constants/sizes";
import { AppSignInStyles as pageStyles } from "./AppSignInStyles";
import { useNavigation } from "expo-router";
import SignInForm from "@/components/Forms/SignInForm";

const AppSignIn = () => {
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
          id="sign-in-header-container"
          style={pageStyles.signInHeaderContainer}
        >
          <Text
            style={{
              fontSize: SIZES.xl3,
              fontWeight: "600",
              color: Colors.lightWhite.text,
              marginTop: "15%",
            }}
          >
            Welcome Back
          </Text>
          <Text style={{ fontSize: SIZES.lg, color: Colors.lightWhite.text }}>
            Sign into your account
          </Text>
        </View>
        <View
          id="sign-in-form-container"
          style={pageStyles.signInFormContainer}
        >
          <SignInForm />

          <View>
            <Text
              style={{
                fontSize: SIZES.md,
                color: Colors.orange.text,
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Text>
          </View>

          <View style={{ flexDirection: "row", columnGap: "8%" }}>
            <Text style={{ fontSize: SIZES.md }}>Don't have an account?</Text>
            <Text
              style={{
                fontSize: SIZES.md,
                color: Colors.orange.text,
                fontWeight: "600",
              }}
              onPress={() => navigation.navigate("Sign Up Screen")}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AppSignIn;
