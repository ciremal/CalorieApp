import { Text, View } from "react-native";
import { StatsHomeStyles as pageStyles } from "./StatsHomeStyles";
import styles from "@/styles/general";
import { LineChart } from "react-native-gifted-charts";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { useGetCalorieChartStats } from "@/api/charts";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { ActivityIndicator } from "react-native-paper";

const StatsHome = () => {
  const {
    data: test,
    isFetching,
    error,
  } = useGetCalorieChartStats("This Week", "2RZ6hgTlqpPfSR4C5r9wUuNqWv03");

  const data = [
    { value: 15, label: "Sun 28", dataPointText: "15" },
    { value: 30, label: "Mon 29", dataPointText: "30" },
    { value: 26, label: "Tue 30", dataPointText: "26" },
    { value: 40, label: "Wed 31", dataPointText: "40" },
    { value: 15, label: "Thu 01", dataPointText: "15" },
    { value: 30, label: "Fri 02", dataPointText: "30" },
    {
      value: 26,
      labelComponent: () => customLabel("Sat 03"),
      dataPointText: "26",
    },
  ];
  const [width, setWidth] = useState(0);

  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    // setHeight(height);
    setWidth(width);
  };

  const customLabel = (val: string) => {
    return (
      <View style={{ marginRight: 20 }}>
        <Text style={{ color: "black", fontSize: 9 }}>{val}</Text>
      </View>
    );
  };

  console.log(test);
  return (
    <View style={styles.body}>
      {error && (
        <ErrorAlert message={"Could not load meals. Please try again later"} />
      )}
      {isFetching && !test && (
        <ActivityIndicator animating={true} color={Colors.orange.text} />
      )}
      {test && !isFetching && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            id="calorie-chart"
            onLayout={onLayout}
            style={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              width: "100%",
              marginTop: "5%",
              rowGap: "10%",
            }}
          >
            <View style={{ display: "flex", paddingHorizontal: 15 }}>
              <Text style={{ fontSize: SIZES.xl }}>Calories</Text>
              <Text style={{ fontSize: SIZES.xl, fontWeight: "600" }}>
                2100
              </Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>Daily Average: 2100</Text>
                <Text>Calorie Goal: 2300</Text>
              </View>
            </View>
            <LineChart
              data={data}
              color={Colors.orange.text}
              width={width * 0.9}
              hideRules
              showVerticalLines
              // stepValue={5}
              stepHeight={25}
              adjustToWidth
              // spacing={width / 7 - 1}
              textColor={Colors.black.text}
              textFontSize1={SIZES.sm}
              endSpacing={20}
              initialSpacing={20}
              disableScroll
              dataPointsColor={Colors.orange.text}
              textShiftX={-8}
              textShiftY={-8}
              hideYAxisText
              dataPointsRadius1={5}
              yAxisColor={"transparent"}
              xAxisLabelTextStyle={{ color: "black", fontSize: 9 }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default StatsHome;
