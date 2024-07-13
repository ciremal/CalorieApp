import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { FormStyles } from "./FormStyles";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { FIREBASE_APP } from "@/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const SignUpForm = () => {
  const auth = getAuth(FIREBASE_APP);

  const handleSubmit = async (
    email: string,
    password: string,
    name: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
      })
      .catch((error) => {
        console.error(error.code);
        console.error("Authentication error:", error.message);
      })
      .finally(() => {
        console.log("User Created Successfully");
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "", name: "" }}
      validate={(values) => {
        const errors = {};

        const validateEmail = new RegExp(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+.[a-zA-Z]{2,}"
        );

        if (!values.name) {
          errors.name = "Name is required";
        }

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!validateEmail.test(values.email)) {
          errors.email = "Invalid email format";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length <= 6) {
          errors.password = "Password must be longer than 6 characters";
        }

        if (
          !values.confirmPassword ||
          values.password !== values.confirmPassword
        ) {
          errors.confirmPassword = "Passwords do not match";
        }

        return errors;
      }}
      onSubmit={(values) =>
        handleSubmit(values.email, values.password, values.name)
      }
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
            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={FormStyles.authTextInput}
              placeholder="Name"
              placeholderTextColor={Colors.black.text}
              textContentType="name"
            />
            {errors.name && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.name}
              </Text>
            )}
          </View>

          <View style={FormStyles.authTextInputContainer}>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={FormStyles.authTextInput}
              placeholder="Email"
              placeholderTextColor={Colors.black.text}
              textContentType="emailAddress"
              inputMode="email"
              autoCorrect={false}
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
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={FormStyles.authTextInput}
              placeholder="Password"
              placeholderTextColor={Colors.black.text}
              textContentType="password"
              secureTextEntry
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

          <View style={FormStyles.authTextInputContainer}>
            <TextInput
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              style={FormStyles.authTextInput}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.black.text}
              textContentType="password"
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
