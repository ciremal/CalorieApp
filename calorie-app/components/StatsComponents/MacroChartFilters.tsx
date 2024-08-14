import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { StatsHomeStyles } from "@/screens/StatsHome/StatsHomeStyles";
import { Text, TouchableOpacity, View } from "react-native";

type MacroChartFiltersProps = {
  showFilter: boolean;
  setShowFilter: any;
  macro: string;
};

const MacroChartFilters = ({
  showFilter,
  setShowFilter,
  macro,
}: MacroChartFiltersProps) => {
  let color;
  switch (macro) {
    case "Carbs":
      color = Colors.carbs;
      break;
    case "Fats":
      color = Colors.fats;
      break;
    case "Proteins":
      color = Colors.proteins;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      onPress={() => setShowFilter(!showFilter)}
      activeOpacity={0.8}
    >
      <View style={StatsHomeStyles.macroFilterContainer}>
        <View
          style={{
            height: SIZES.md,
            width: SIZES.md,
            backgroundColor: color,
            opacity: showFilter ? 1 : 0.5,
          }}
        />
        <Text
          style={{
            textDecorationLine: showFilter ? "none" : "line-through",
            fontSize: SIZES.md,
            opacity: showFilter ? 1 : 0.5,
          }}
        >
          {macro}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MacroChartFilters;
