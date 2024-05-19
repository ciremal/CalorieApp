import { View, Text, TouchableOpacity } from "react-native";
import mealboxStyles from "./mealboxStyles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SIZES } from "../../constants/sizes";
import { useNavigation } from "@react-navigation/native";

const MealBox = ({ mealName, fats, carbs, proteins, calories }) => {
  const navigation = useNavigation();

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
          {mealName}
        </Text>
        <TouchableOpacity
          onPress={
            () => navigation.navigate("Meal Summary", { mealName: mealName })
            // router.push({
            //   pathname: "/meal",
            //   params: { mealName: mealName },
            // })
          }
        >
          <Ionicons name="add-circle-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View style={mealboxStyles.mealBoxLayer2}>
        <Text style={mealboxStyles.nutritionNumber}>{fats}</Text>
        <Text style={mealboxStyles.nutritionNumber}>{carbs}</Text>
        <Text style={mealboxStyles.nutritionNumber}>{proteins}</Text>
        <Text style={mealboxStyles.nutritionNumberCalorie}>{calories}</Text>
      </View>
    </View>
  );
};

export default MealBox;
