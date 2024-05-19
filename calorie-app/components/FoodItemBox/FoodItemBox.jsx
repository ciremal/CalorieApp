import { View, Text, TouchableOpacity } from "react-native";
import { foodItemBoxStyles } from "./FoodItemBoxStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FoodItemBox = ({
  foodName,
  fats,
  carbs,
  proteins,
  calories,
  quantity,
  unit,
}) => {
  const router = useRouter();

  return (
    <View style={foodItemBoxStyles.foodBox}>
      <View style={foodItemBoxStyles.foodBoxLayer1}>
        <Text style={foodItemBoxStyles.foodItemTitle}>
          {`${foodName} (${quantity} ${unit})`}
        </Text>
        <TouchableOpacity
        //   onPress={() =>
        //     router.push({
        //       pathname: "/meal",
        //       params: { foodName: foodName },
        //     })
        //   }
        >
          <FontAwesome name="trash-o" size={32} color={Colors.black.text} />
        </TouchableOpacity>
      </View>

      <View style={foodItemBoxStyles.foodBoxLayer2}>
        <Text style={foodItemBoxStyles.nutritionNumber}>{fats}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{carbs}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{proteins}</Text>
        <Text style={foodItemBoxStyles.nutritionNumberCalorie}>{calories}</Text>
      </View>
    </View>
  );
};

export default FoodItemBox;
