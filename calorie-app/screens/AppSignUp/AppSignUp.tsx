import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { AppSignUpStyles as pageStyles } from "./AppSignUpStyles";
import SignUpForm from "@/components/Forms/SignUpForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AppSignUp = () => {
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
          <Text>Sign Up</Text>
          <Text>Create your account</Text>
        </View>
        <View
          id="sign-up-form-container"
          style={pageStyles.signUpFormContainer}
        >
          <SignUpForm />
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AppSignUp;
