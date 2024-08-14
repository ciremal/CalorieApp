import { Colors } from "@/constants/Colors";
import { Dimensions, FlatList, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SIZES } from "@/constants/sizes";
import {
  getNutrientBreakdownByCalorieCount,
  getTotalNutrient,
} from "@/helpers/getNutrientStats";

type MealHomeSummaryProps = {
  meals: any[];
};

const MealHomeSummary = ({ meals }: MealHomeSummaryProps) => {
  const width = Dimensions.get("window").width;

  const data = getNutrientBreakdownByCalorieCount(meals);

  const pieData = [
    {
      value: data.fats.perc,
      color: Colors.fats,
      text: `Fats`,
    },
    {
      value: data.carbs.perc,
      color: Colors.carbs,
      text: `Carbs`,
    },
    {
      value: data.proteins.perc,
      color: Colors.proteins,
      text: `Proteins`,
    },
  ];
  const totalCals = getTotalNutrient("cals", meals);

  const Legend = () => {
    return (
      <FlatList
        scrollEnabled={false}
        data={pieData}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View
              style={{
                height: SIZES.md,
                width: SIZES.md,
                marginRight: 7,
                borderRadius: 4,
                backgroundColor: item.color,
              }}
            />
            <Text style={{ color: Colors.black.text, fontSize: SIZES.md }}>
              {`${item.text}: ${item.value}%`}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.text}
      />
    );
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <PieChart
        data={pieData}
        radius={width / 3}
        donut
        strokeColor={Colors.black.text}
        strokeWidth={3}
        innerCircleBorderColor={Colors.black.text}
        innerCircleBorderWidth={3}
        centerLabelComponent={() => {
          return (
            <View>
              <Text
                style={{
                  color: Colors.black.text,
                  fontSize:
                    totalCals.toString().length < 4 ? SIZES.xl : SIZES.lg,
                  textAlign: "center",
                }}
              >
                {totalCals}
              </Text>
              <Text
                style={{
                  color: Colors.black.text,
                  fontSize: SIZES.lg,
                  textAlign: "center",
                }}
              >
                Calories
              </Text>
            </View>
          );
        }}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <Legend />
      </View>
    </View>
  );
};

export default MealHomeSummary;
