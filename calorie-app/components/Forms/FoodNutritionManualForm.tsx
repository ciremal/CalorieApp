import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import { FlatList, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "react-native-paper";
import { FormStyles } from "./FormStyles";
import { SIZES } from "@/constants/sizes";
import { useState } from "react";

type FoodNutritonFormProps = {
  handleAddFood: any;
  mealName: string;
  measures: any[];
  allNutrients: any[];
};

const FoodNutritonManualForm = ({
  handleAddFood,
  mealName,
  measures,
  allNutrients,
}: FoodNutritonFormProps): JSX.Element => {
  // Default, required nutrients
  const [selectedNutrients, setSelectedNutrients] = useState<any>([
    { label: "Calories", unit: "g", quantity: 0 },
    { label: "Fats", unit: "g", quantity: 0 },
    { label: "Carbs", unit: "g", quantity: 0 },
    { label: "Proteins", unit: "g", quantity: 0 },
  ]);

  // Declare initial form values
  const nutrientsObjects = selectedNutrients.reduce(
    (acc: any, nutrient: any) => {
      acc[nutrient.label] = nutrient.quantity;
      return acc;
    },
    {}
  );
  const initialValues = {
    foodName: "",
    quantity: 100,
    unitOfMeasurement: { label: "Gram" },
    notes: "",
    ...nutrientsObjects,
  };

  const handleSelectNutrient = (nutrient: string) => {
    const labels = selectedNutrients.map((item: any) => item.label);
    if (!labels.includes(nutrient)) {
      const newNutrient = allNutrients.find((item) => item.label === nutrient);
      setSelectedNutrients((prev: any) => [...prev, newNutrient]);
    } else {
      setSelectedNutrients((prev: any[]) =>
        prev.filter((item: any) => item.label !== nutrient)
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.foodName) {
          errors.foodName = "Food name is required";
        } else if (values.foodName.length > 25) {
          errors.foodName = "Food name should be between 1 and 25 characters";
        }

        if (!values.quantity) {
          errors.quantity = "Quantity is required";
        } else if (values.quantity > 9999) {
          errors.quantity = "Quantity must be between 0 and 9999";
        }

        const nutrientLabels = selectedNutrients.map((item: any) => item.label);
        nutrientLabels.forEach((item: string) => {
          if (!values[item] && values[item] !== 0) {
            errors[item] = "Amount required";
          } else if (values[item] > 9999) {
            errors[item] = "Quantity must be between 0 and 9999";
          }
        });
        return errors;
      }}
      onSubmit={(values) => {
        handleAddFood(values);
      }}
      enableReinitialize
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
              onChangeText={handleChange("quantity")}
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
              value={values.unitOfMeasurement.label}
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
              onChange={(item) =>
                setFieldValue("unitOfMeasurement", item.label)
              }
              search={false}
              placeholder={"Gram"}
            />
          </View>
          <View
            id="food-nutrition-flatlist-container"
            style={{ paddingHorizontal: 10, marginLeft: 5 }}
          >
            <Text style={{ fontSize: 18 }}>Nutrients</Text>
            <Dropdown
              data={allNutrients.filter(
                (item) =>
                  !["Calories", "Fats", "Carbs", "Proteins"].includes(
                    item.label
                  )
              )}
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
              onChange={(item) => handleSelectNutrient(item.label)}
              search={false}
              placeholder={"Select nutrients to add"}
            />
            {console.log(values)}
            <FlatList
              scrollEnabled={false}
              data={selectedNutrients}
              renderItem={({ item }) => (
                <View>
                  <Text>{item.label}</Text>
                  <TextInput
                    inputMode="decimal"
                    style={FormStyles.textInput}
                    value={
                      values[item.label] ? values[item.label].toString() : "0"
                    }
                    onChangeText={handleChange(item.label)}
                    onBlur={handleBlur(item.label)}
                  />
                  {errors[item.label] && (
                    <Text
                      style={{
                        marginBottom: 10,
                        color: Colors.red.text,
                      }}
                    >
                      {errors[item.label]}
                    </Text>
                  )}
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
          >
            Add to {mealName}
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default FoodNutritonManualForm;
