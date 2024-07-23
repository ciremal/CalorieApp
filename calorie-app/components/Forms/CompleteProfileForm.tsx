import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "react-native-paper";
import { FormStyles } from "./FormStyles";
import { SIZES } from "@/constants/sizes";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "@/helpers/dates";
import { useMutation, useQueryClient } from "react-query";
import { useUpdateUser } from "@/api/user";
import { useNavigation } from "expo-router";

type CompleteProfileFormProps = {
  name: string;
  id: string;
};

const CompleteProfileForm = ({
  name,
  id,
}: CompleteProfileFormProps): JSX.Element => {
  const navigation = useNavigation();

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
      weight: values.weight,
      PA: values.PA.label,
      calorieGoal: values.calorieGoal,
      weightGoal: values.weightGoal,
      profileComplete: true,
    };

    mutate({ user: user, id: id });
  };

  return (
    <Formik
      initialValues={{
        name: name,
        gender: "",
        DOB: "",
        height: 0,
        weight: 0,
        PA: "",
        calGoal: 0,
        weightGoal: 0,
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

        if (!values.weight) {
          errors.weight = "Field is required";
        } else if (values.weight <= 0) {
          errors.weight = "Weight must be greater than 0";
        }

        if (!values.PA) {
          errors.PA = "Field is required";
        }

        if (!values.calGoal) {
          errors.calGoal = "Field is required";
        }

        if (!values.weightGoal) {
          errors.weightGoal = "Field is required";
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
            <Text style={FormStyles.textInputLabel}>Weight (kg)</Text>
            <TextInput
              style={FormStyles.textInput}
              value={values.weight.toString()}
              onChangeText={handleChange("weight")}
              onBlur={handleBlur("weight")}
              inputMode="decimal"
            />
            {errors.weight && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.weight}
              </Text>
            )}
          </View>

          <View>
            <Text style={FormStyles.textInputLabel}>
              How physically active are you?
            </Text>
            <Dropdown
              data={[
                { label: "Sedentary" },
                { label: "Low Active" },
                { label: "Active" },
                { label: "Very Active" },
              ]}
              labelField={"label"}
              valueField={"label"}
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
                setFieldValue("PA", item);
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

          <Text style={FormStyles.textGroupHeader}>Goals</Text>
          <View>
            <Text style={FormStyles.textInputLabel}>
              What is your Calorie Goal?
            </Text>
            <TextInput
              style={FormStyles.textInput}
              value={values.calGoal.toString()}
              onChangeText={handleChange("calGoal")}
              onBlur={handleBlur("calGoal")}
              inputMode="decimal"
            />
            {errors.calGoal && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.calGoal}
              </Text>
            )}
          </View>

          <View>
            <Text style={FormStyles.textInputLabel}>
              What is your Weight Goal? (kg)
            </Text>
            <TextInput
              style={FormStyles.textInput}
              value={values.weightGoal.toString()}
              onChangeText={handleChange("weightGoal")}
              onBlur={handleBlur("weightGoal")}
              inputMode="decimal"
            />
            {errors.weightGoal && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.weightGoal}
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
  );
};

export default CompleteProfileForm;
