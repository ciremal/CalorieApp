import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import { FlatList, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "react-native-paper";
import { FormStyles } from "./FormStyles";
import { SIZES } from "@/constants/sizes";

type FoodNutritonFormProps = {
  name: string;
  quantity: number;
  setQuantity: any;
  unitOfMeasurement: string;
  setUnitOfMeasurement: any;
  handleAddFood: any;
  measures: any;
  nutrients: any;
  mealName: string;
  loadingSubmit: boolean;
};

const FoodNutritonForm = ({
  name,
  quantity,
  setQuantity,
  unitOfMeasurement,
  setUnitOfMeasurement,
  handleAddFood,
  measures,
  nutrients,
  mealName,
  loadingSubmit,
}: FoodNutritonFormProps): JSX.Element => {
  return (
    <Formik
      initialValues={{
        foodName: name,
        quantity: quantity,
        notes: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.foodName) {
          errors.foodName = "Food name is required";
        } else if (values.foodName.length > 100) {
          errors.foodName = "Food name should be between 1 and 100 characters";
        }
        if (!values.quantity) {
          errors.quantity = "Quantity is required";
        } else if (values.quantity > 9999) {
          errors.quantity = "Quantity must be between 0 and 9999";
        }
        return errors;
      }}
      onSubmit={(values) => {
        const { foodName, quantity, notes } = values;
        handleAddFood(foodName, quantity, unitOfMeasurement, notes);
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
        <View style={{ width: "95%", rowGap: 12 }} id="food-item-name-input">
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Name</Text>
            <TextInput
              style={FormStyles.textInput}
              value={values.foodName}
              onChangeText={handleChange("foodName")}
              onBlur={handleBlur("foodName")}
            />
            {errors.foodName && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.foodName}
              </Text>
            )}
          </View>
          <View style={{ paddingHorizontal: 10 }} id="food-item-quantity-input">
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Quantity</Text>
            <TextInput
              inputMode="decimal"
              style={FormStyles.textInput}
              value={values.quantity.toString()}
              onChangeText={(e) => {
                setFieldValue("quantity", e);
                setQuantity(e);
              }}
              onBlur={handleBlur("quantity")}
            />
            {errors.quantity && (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.red.text,
                }}
              >
                {errors.quantity}
              </Text>
            )}
          </View>
          <View
            style={{ paddingHorizontal: 10 }}
            id="unit-of-measurement-dropdown"
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>
              Unit of Measurement
            </Text>
            <Dropdown
              data={measures}
              labelField={"label"}
              valueField={"label"}
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
                setUnitOfMeasurement(item.label);
              }}
              search={false}
              placeholder={unitOfMeasurement}
            />
          </View>
          <View id="food-nutrition-flatlist-container">
            <FlatList
              scrollEnabled={false}
              data={nutrients}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "center" }}
              renderItem={({ item }) => (
                <View style={FormStyles.grid}>
                  <Text>{item.label}</Text>
                  <Text>
                    {item.quantity}
                    {item.unit}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.label}
            />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18 }}>Notes</Text>
            <TextInput
              multiline={true}
              style={[
                FormStyles.textInput,
                { minHeight: 100, color: Colors.black.text },
              ]}
              value={values.notes}
              onChangeText={handleChange("notes")}
              onBlur={handleBlur("notes")}
            />
          </View>
          <Button
            mode="contained"
            textColor={Colors.black.text}
            buttonColor={Colors.lightOrange.text}
            labelStyle={{ fontSize: 18 }}
            onPress={() => handleSubmit()}
            loading={loadingSubmit}
          >
            Add to {mealName}
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default FoodNutritonForm;
