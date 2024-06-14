import { View, Text } from "react-native";
import { searchSuggestions as pageStyles } from "./SearchSuggestionStyle";
import { TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { SIZES } from "../../constants/sizes";
import roundNumbers from "../../helpers/roundNumbers";

type SearchSuggestionProps = {
  name: string;
  cals: number;
  brand: string;
  foodId: string;
  measures: any;
  handleSelectedItem: (
    foodId: string,
    measureId: string,
    foodName: string,
    measures: any
  ) => void;
};

const SearchSuggestion = ({
  name,
  cals,
  brand,
  foodId,
  measures,
  handleSelectedItem,
}: SearchSuggestionProps) => {
  const measureId = measures.find((item: any) => item.label === "Gram").uri;

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
