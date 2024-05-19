import { View, Text } from "react-native";
import { searchSuggestions as pageStyles } from "./SearchSuggestionStyle";
import { TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";
import roundNumbers from "../../helpers/roundNumbers";

const SearchSuggestion = ({
  name,
  cals,
  brand,
  foodId,
  measures,
  handleSelectedItem,
}) => {
  const measureId = measures.find((item) => item.label === "Gram").uri;

  return (
    <View style={pageStyles.container}>
      <Divider style={{ backgroundColor: Colors.orange.text }} bold={true} />
      <TouchableOpacity
        onPress={() => handleSelectedItem(foodId, measureId, name, measures)}
      >
        <View style={{ paddingLeft: "5%", paddingBottom: "2%" }}>
          <Text style={{ fontSize: SIZES.lg }}>{name}</Text>
          {brand && (
            <Text style={{ fontSize: 18, fontStyle: "italic" }}>{brand}</Text>
          )}
          <Text style={{ fontSize: 18 }}>{roundNumbers(cals)}g</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchSuggestion;
