import { View, Text, TouchableOpacity } from "react-native";
import { foodItemBoxStyles } from "./FoodItemBoxStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Dialog, Portal, Button } from "react-native-paper";
import { useState } from "react";

const FoodItemBox = ({ foodItem, handleDelete }) => {
  const {
    _id: id,
    name,
    quantity,
    unitOfMeasurement,
    mainNutrients,
  } = foodItem;
  const { cals, carbs, fats, proteins } = mainNutrients;

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View style={foodItemBoxStyles.foodBox}>
      <View style={foodItemBoxStyles.foodBoxLayer1}>
        <Text style={foodItemBoxStyles.foodItemTitle}>
          {`${name} (${quantity} ${unitOfMeasurement})`}
        </Text>
        <TouchableOpacity onPress={() => showDialog()}>
          <FontAwesome name="trash-o" size={32} color={Colors.black.text} />
        </TouchableOpacity>
      </View>

      <View style={foodItemBoxStyles.foodBoxLayer2}>
        <Text style={foodItemBoxStyles.nutritionNumber}>{fats}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{carbs}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{proteins}</Text>
        <Text style={foodItemBoxStyles.nutritionNumberCalorie}>{cals}</Text>
      </View>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={foodItemBoxStyles.dialog}
        >
          <Dialog.Content>
            <Text
              variant="bodyLarge"
              style={{ color: Colors.black.text, textAlign: "center" }}
            >
              Are you sure you want to delete {name} from this meal?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "center" }}>
            <Button
              mode="outlined"
              buttonColor={Colors.lightWhite.text}
              textColor={Colors.black.text}
              style={foodItemBoxStyles.dialogButton}
              contentStyle={{ paddingHorizontal: "6%" }}
              onPress={hideDialog}
            >
              Cancel
            </Button>
            <Button
              mode="outlined"
              buttonColor={Colors.red.text}
              textColor={Colors.lightWhite.text}
              style={foodItemBoxStyles.dialogButton}
              contentStyle={{ paddingHorizontal: "6%" }}
              onPress={() => handleDelete(id, hideDialog)}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FoodItemBox;
