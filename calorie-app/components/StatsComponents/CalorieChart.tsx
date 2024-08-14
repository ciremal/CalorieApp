import { ScrollView, Text, View } from "react-native";
import { StatsHomeStyles } from "@/screens/StatsHome/StatsHomeStyles";
import { SIZES } from "@/constants/sizes";
import { Dropdown } from "react-native-element-dropdown";
import { useGetCalorieChartStats } from "@/api/charts";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../Alerts/Alerts";
import { ActivityIndicator } from "react-native-paper";
import roundNumbers from "@/helpers/roundNumbers";
import styles from "@/styles/general";
import CalorieSummaryChart from "../Charts/CalorieSummaryChart";
import { Colors } from "@/constants/Colors";

type CalorieChartProps = {
  userData: any;
};

const CalorieChart = ({ userData }: CalorieChartProps) => {
  const [width, setWidth] = useState(0);
  const [period, setPeriod] = useState("This Week");
  const { data, isFetching, error, refetch } = useGetCalorieChartStats(
    period,
    userData._id
  );

  useEffect(() => {
    refetch();
  }, [period]);

  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    // setHeight(height);
    setWidth(width);
  };

  const customLabel = (date: string) => {
    const dayOfWeek = new Date(date).getDay();
    const val = getDayOfWeek(date);
    return (
      <View style={{ marginLeft: dayOfWeek === 5 ? 0 : 10 }}>
        <Text style={{ color: "black", fontSize: 9 }}>{val}</Text>
      </View>
    );
  };

  const getDayOfWeek = (date: string) => {
    const num = new Date(date);
    const dayNumber = date.split("-")[2];
    switch (num.getDay()) {
      case 0:
        return `Mon ${dayNumber}`;
      case 1:
        return `Tue ${dayNumber}`;
      case 2:
        return `Wed ${dayNumber}`;
      case 3:
        return `Thu ${dayNumber}`;
      case 4:
        return `Fri ${dayNumber}`;
      case 5:
        return `Sat ${dayNumber}`;
      case 6:
        return `Sun ${dayNumber}`;
      default:
        return "NAN";
    }
  };

  const getTotalCalories = (values: any) => {
    return roundNumbers(
      values.reduce((sum: number, curr: number) => sum + curr, 0)
    );
  };

  const getAverageCalories = (values: any) => {
    const sum = getTotalCalories(values);
    return roundNumbers(sum / values.length);
  };

  if (error) {
    return (
      <View style={styles.body}>
        <ErrorAlert message={"Could not load charts. Please try again later"} />
      </View>
    );
  } else if (isFetching || !data) {
    return (
      <View style={styles.body}>
        <ActivityIndicator animating={true} color={Colors.orange.text} />
      </View>
    );
  } else if (data && !isFetching) {
    const dataset = data.map((item: any) => {
      return {
        value: item.totalCals,
        labelComponent: () => customLabel(item.date),
        dataPointText: item.totalCals.toString(),
      };
    });
    const calValues = dataset.map((item: any) => item.value);

    return (
      <>
        <View
          id="calorie-chart"
          onLayout={onLayout}
          style={StatsHomeStyles.container}
        >
          <View style={StatsHomeStyles.chartInfoContainer}>
            <Text style={{ fontSize: SIZES.xl }}>Calories</Text>
            <Text style={{ fontSize: SIZES.xl, fontWeight: "600" }}>
              {getTotalCalories(calValues)}
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>Daily Average: {getAverageCalories(calValues)}</Text>
              <Text>Calorie Goal: {userData.calorieGoal}</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Dropdown
              data={[{ label: "This Week" }, { label: "Last Week" }]}
              labelField={"label"}
              valueField={"label"}
              value={period}
              style={StatsHomeStyles.textInput}
              placeholderStyle={StatsHomeStyles.textInputText}
              selectedTextStyle={StatsHomeStyles.textInputText}
              onChange={(item) => {
                setPeriod(item.label);
              }}
              search={false}
            />
          </View>
          <CalorieSummaryChart
            dataset={dataset}
            values={calValues}
            width={width}
            calGoal={userData.calorieGoal}
          />
        </View>
      </>
    );
  } else {
    return <></>;
  }
};

export default CalorieChart;
