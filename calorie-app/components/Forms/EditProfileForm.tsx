import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "react-native-paper";
import { FormStyles } from "./FormStyles";
import { SIZES } from "@/constants/sizes";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateToday, formatDate } from "@/helpers/dates";
import { useMutation, useQueryClient } from "react-query";
import { useUpdateUser } from "@/api/user";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type EditProfileFormProps = {
  user: any;
  id: string;
};

const EditProfileForm = ({ user, id }: EditProfileFormProps): JSX.Element => {
  const navigation = useNavigation();

  const {
    name,
    gender,
    DOB,
    height,
    PA,
    startWeight,
    currentWeight,
    weightHistory,
    calorieGoal,
    weightGoal,
  } = user;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: useUpdateUser,
    onSuccess: async () => {
      console.log("User form complete");
      await queryClient.refetchQueries({
        queryKey: ["getUserById", id],
        active: true,
      });
      navigation.navigate("Profile Home");
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const handleDate = (date: any, setFieldValue: any) => {
    setFieldValue("DOB", formatDate(date));
    hideDatePicker();
  };

  const handleSubmit = (values: any) => {
    const user = {
      name: values.name,
      gender: values.gender.label,
      DOB: values.DOB,
      height: values.height,
      startWeight: startWeight,
      currentWeight: currentWeight,
      weightHistory: weightHistory,
      PA: values.PA,
      calorieGoal: calorieGoal,
      weightGoal: weightGoal,
      profileComplete: true,
    };

    mutate({ user: user, id: id });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, width: "100%" }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardOpeningTime={0}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Formik
        initialValues={{
          name: name,
          gender: gender,
          DOB: DOB,
          height: height,
          PA: PA,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }

          if (!values.gender) {
            errors.gender = "Field is required";
          }

          if (!values.DOB) {
            errors.DOB = "Field is required";
          }

          if (!values.height) {
            errors.height = "Field is required";
          } else if (values.height <= 0) {
            errors.height = "Height must be greater than 0";
          }

          if (!values.PA) {
            errors.PA = "Field is required";
          }

          return errors;
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <View style={{ width: "95%", rowGap: 12, paddingHorizontal: 15 }}>
            <Text style={FormStyles.textGroupHeader}>Personal Information</Text>
            <View>
              <Text style={FormStyles.textInputLabel}>Name</Text>
              <TextInput
                style={FormStyles.textInput}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
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

            <View>
              <Text style={FormStyles.textInputLabel}>Gender</Text>
              <Dropdown
                data={[
                  { label: "Male" },
                  { label: "Female" },
                  { label: "Other" },
                ]}
                labelField={"label"}
                valueField={"label"}
                value={values.gender}
                style={FormStyles.textInput}
                placeholderStyle={{
                  color: Colors.lightOrange.text,
                  textAlign: "left",
                  fontSize: SIZES.lg,
                }}
                selectedTextStyle={{
                  color: Colors.lightOrange.text,
                  textAlign: "left",
                  fontSize: SIZES.lg,
                }}
                onChange={(item) => {
                  setFieldValue("gender", item);
                }}
                search={false}
              />
              {errors.gender && (
                <Text
                  style={{
                    marginBottom: 10,
                    color: Colors.red.text,
                  }}
                >
                  {errors.gender}
                </Text>
              )}
            </View>

            <View>
              <Text style={FormStyles.textInputLabel}>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => showDatePicker()}
                activeOpacity={1}
              >
                <TextInput
                  style={FormStyles.textInput}
                  value={values.DOB}
                  onChangeText={handleChange("DOB")}
                  onBlur={handleBlur("DOB")}
                  editable={false}
                  onPress={() => showDatePicker()}
                  placeholder="Select Date"
                  placeholderTextColor={Colors.lightOrange.text}
                />
                <FontAwesome
                  name="calendar"
                  size={24}
                  color="black"
                  style={{ position: "absolute", right: "5%", top: "25%" }}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleDate(date, setFieldValue)}
                onCancel={hideDatePicker}
              />
              {errors.DOB && (
                <Text
                  style={{
                    marginBottom: 10,
                    color: Colors.red.text,
                  }}
                >
                  {errors.DOB}
                </Text>
              )}
            </View>

            <View>
              <Text style={FormStyles.textInputLabel}>Height (cm)</Text>
              <TextInput
                style={FormStyles.textInput}
                value={values.height.toString()}
                onChangeText={handleChange("height")}
                onBlur={handleBlur("height")}
                inputMode="decimal"
              />
              {errors.height && (
                <Text
                  style={{
                    marginBottom: 10,
                    color: Colors.red.text,
                  }}
                >
                  {errors.height}
                </Text>
              )}
            </View>

            <View>
              <Text style={FormStyles.textInputLabel}>
                How would you describe your activity level on an average week?
              </Text>
              <Dropdown
                data={[
                  {
                    label:
                      "Sedentary: Typical daily living activities (e.g. household tasks, walking to the bus)",
                    value: "Sedentary",
                  },
                  {
                    label:
                      "Low Active: 30 - 60 minutes of daily moderate activity (ex. walking a faster than normal pace)",
                    value: "Low Active",
                  },
                  {
                    label:
                      "Active: At least 60 minutes of daily moderate activity",
                    value: "Active",
                  },
                  {
                    label:
                      "Very Active: At least 60 minutes of daily moderate activity plus an additional 60 minutes of vigorous activity, or 120 minutes of moderate activity",
                    value: "Very Active",
                  },
                ]}
                labelField={"label"}
                valueField={"value"}
                value={values.PA}
                style={FormStyles.textInput}
                placeholderStyle={{
                  color: Colors.lightOrange.text,
                  textAlign: "left",
                  fontSize: SIZES.lg,
                }}
                selectedTextStyle={{
                  color: Colors.lightOrange.text,
                  textAlign: "left",
                  fontSize: SIZES.lg,
                }}
                onChange={(item) => {
                  setFieldValue("PA", item.value);
                }}
                search={false}
              />
              {errors.PA && (
                <Text
                  style={{
                    marginBottom: 10,
                    color: Colors.red.text,
                  }}
                >
                  {errors.PA}
                </Text>
              )}
            </View>

            <Button
              mode="contained"
              textColor={Colors.black.text}
              buttonColor={Colors.lightOrange.text}
              labelStyle={{ fontSize: 18 }}
              onPress={() => handleSubmit()}
            >
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileForm;
