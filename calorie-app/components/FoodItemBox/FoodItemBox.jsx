import { View, Text, TouchableOpacity } from "react-native";
import { foodItemBoxStyles } from "./FoodItemBoxStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Dialog, Portal, Button } from "react-native-paper";

const FoodItemBox = ({
  foodName,
  fats,
  carbs,
  proteins,
  calories,
  quantity,
  unit,
  visible,
  showDialog,
  hideDialog,
  handleDelete,
}) => {
  return (
    <View style={foodItemBoxStyles.foodBox}>
      <View style={foodItemBoxStyles.foodBoxLayer1}>
        <Text style={foodItemBoxStyles.foodItemTitle}>
          {`${foodName} (${quantity} ${unit})`}
        </Text>
        <TouchableOpacity onPress={() => showDialog()}>
          <FontAwesome name="trash-o" size={32} color={Colors.black.text} />
        </TouchableOpacity>
      </View>

      <View style={foodItemBoxStyles.foodBoxLayer2}>
        <Text style={foodItemBoxStyles.nutritionNumber}>{fats}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{carbs}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{proteins}</Text>
        <Text style={foodItemBoxStyles.nutritionNumberCalorie}>{calories}</Text>
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
              Are you sure you want to delete {foodName} from this meal?
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
              onPress={() => handleDelete()}
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
