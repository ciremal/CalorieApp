import { View, Text, TouchableOpacity } from "react-native";
import mealboxStyles from "./mealboxStyles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants/sizes";
import { useNavigation } from "@react-navigation/native";

const MealBox = ({ meal }) => {
  const navigation = useNavigation();

  const { cals, carbs, proteins, fats, title } = meal;

  return (
    <View style={mealboxStyles.mealBox}>
      <View style={mealboxStyles.mealBoxLayer1}>
        <Text
          style={{
            color: Colors.lightWhite.text,
            fontSize: SIZES.lg,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Meal Summary", { meal: meal })}
        >
          <Ionicons name="add-circle-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View style={mealboxStyles.mealBoxLayer2}>
        <Text style={mealboxStyles.nutritionNumber}>{fats}</Text>
        <Text style={mealboxStyles.nutritionNumber}>{carbs}</Text>
        <Text style={mealboxStyles.nutritionNumber}>{proteins}</Text>
        <Text style={mealboxStyles.nutritionNumberCalorie}>{cals}</Text>
      </View>
    </View>
  );
};

export default MealBox;
