import { View, Text, TouchableOpacity } from "react-native";
import { foodItemBoxStyles } from "./FoodItemBoxStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

type FoodItemBoxProps = {
  foodItem: any;
  handleDelete: (foodId: string, hideDialog: () => void) => void;
};

const FoodItemBox = ({ foodItem, handleDelete }: FoodItemBoxProps) => {
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

      <DeleteDialog
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={handleDelete}
        id={id}
        warning={`Are you sure you want to delete ${name} from this meal?`}
      />
    </View>
  );
};

export default FoodItemBox;
