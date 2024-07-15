import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { FormStyles } from "./FormStyles";
import { Colors } from "@/constants/Colors";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { FIREBASE_APP } from "@/FirebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import IconTextInput from "../IconTextInput/IconTextInput";
import { Button } from "react-native-paper";
import { SIZES } from "@/constants/sizes";

const SignInForm = () => {
  const auth = getAuth(FIREBASE_APP);

  const [error, setError] = useState<string>();

  const handleSubmit = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User successfully logged in");
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        if (error.message.includes("invalid-credential")) {
          setError(
            "Sorry, the email or password you entered does not match our records. Please try again, Sign Up for an account, or click Forgot Password."
          );
        } else {
          setError(
            "Sorry, an unexpected error has occured. Please try again later."
          );
        }
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        const validateEmail = new RegExp(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+.[a-zA-Z]{2,}"
        );

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!validateEmail.test(values.email)) {
          errors.email = "Invalid email format";
        }

        if (!values.password) {
          errors.password = "Password is required";
        }

        return errors;
      }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => handleSubmit(values.email, values.password)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "15%",
          }}
        >
          <View style={FormStyles.authTextInputContainer}>
            <IconTextInput
              Icon={Feather}
              iconProps={{ name: "mail", size: 26, color: "black" }}
              TextInput={TextInput}
              textInputProps={{
                onChangeText: handleChange("email"),
                onBlur: handleBlur("email"),
                value: values.email,
                style: FormStyles.authTextInput,
                placeholder: "Email",
                placeholderTextColor: Colors.black.text,
                textContentType: "emailAddress",
                inputMode: "email",
                autoCorrect: false,
              }}
            />
            {errors.email && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.email}
              </Text>
            )}
          </View>

          <View style={FormStyles.authTextInputContainer}>
            <IconTextInput
              Icon={SimpleLineIcons}
              iconProps={{ name: "lock", size: 26, color: "black" }}
              TextInput={TextInput}
              textInputProps={{
                onChangeText: handleChange("password"),
                onBlur: handleBlur("password"),
                value: values.password,
                style: FormStyles.authTextInput,
                placeholder: "Password",
                placeholderTextColor: Colors.black.text,
                textContentType: "password",
                secureTextEntry: true,
              }}
            />
            {errors.password && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.password}
              </Text>
            )}
          </View>

          {error && (
            <View>
              <Text style={{ color: Colors.red.text }}>{error}</Text>
            </View>
          )}

          <Button
            mode="elevated"
            buttonColor={Colors.lightOrange.text}
            textColor={Colors.black.text}
            labelStyle={{ fontSize: SIZES.lg }}
            style={{ borderRadius: 50, marginTop: 15 }}
            contentStyle={{ paddingVertical: 10, paddingHorizontal: "15%" }}
            onPress={() => handleSubmit()}
          >
            Sign In
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
