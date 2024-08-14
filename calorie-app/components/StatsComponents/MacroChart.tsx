import { Text, View } from "react-native";
import { StatsHomeStyles } from "@/screens/StatsHome/StatsHomeStyles";
import { SIZES } from "@/constants/sizes";
import { Dropdown } from "react-native-element-dropdown";
import { useGetMacroChartStats } from "@/api/charts";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../Alerts/Alerts";
import { ActivityIndicator } from "react-native-paper";
import styles from "@/styles/general";
import { Colors } from "@/constants/Colors";
import MacroSummaryChart from "../Charts/MacroSummaryChart";
import MacroChartFilters from "./MacroChartFilters";
import MacroChartInfo from "./MacroChartInfo";

type MacroChartProps = {
  userData: any;
};

const MacroChart = ({ userData }: MacroChartProps) => {
  const [width, setWidth] = useState(0);
  const [period, setPeriod] = useState("This Week");
  const [showCarbs, setShowCarbs] = useState(true);
  const [showFats, setShowFats] = useState(true);
  const [showProteins, setShowProteins] = useState(true);

  const { data, isFetching, error, refetch } = useGetMacroChartStats(
    period,
    userData._id
  );

  useEffect(() => {
    refetch();
  }, [period]);

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
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
    const datasetCarbs = data.map((item: any) => {
      return {
        value: item.totalCarbs,
        label: getDayOfWeek(item.date),
      };
    });
    const carbValues = datasetCarbs.map((item: any) => item.value);

    const datasetFats = data.map((item: any) => {
      return {
        value: item.totalFats,
        label: getDayOfWeek(item.date),
      };
    });
    const fatValues = datasetFats.map((item: any) => item.value);

    const datasetProteins = data.map((item: any) => {
      return {
        value: item.totalProteins,
        label: getDayOfWeek(item.date),
      };
    });
    const proteinValues = datasetProteins.map((item: any) => item.value);

    return (
      <>
        <View
          id="calorie-chart"
          onLayout={onLayout}
          style={StatsHomeStyles.container}
        >
          <View style={StatsHomeStyles.chartInfoContainer}>
            <Text style={{ fontSize: SIZES.xl, marginBottom: "3%" }}>
              Macronutrients
            </Text>
            <MacroChartInfo values={carbValues} macro={"Carbs"} />
            <MacroChartInfo values={fatValues} macro={"Fats"} />
            <MacroChartInfo values={proteinValues} macro={"Proteins"} />
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: "10%",
              }}
            >
              <MacroChartFilters
                showFilter={showCarbs}
                setShowFilter={setShowCarbs}
                macro="Carbs"
              />
              <MacroChartFilters
                showFilter={showFats}
                setShowFilter={setShowFats}
                macro="Fats"
              />
              <MacroChartFilters
                showFilter={showProteins}
                setShowFilter={setShowProteins}
                macro="Proteins"
              />
            </View>
          </View>
          <MacroSummaryChart
            datasetCarbs={datasetCarbs}
            datasetFats={datasetFats}
            datasetProteins={datasetProteins}
            showCarbs={showCarbs}
            showFats={showFats}
            showProteins={showProteins}
            carbValues={carbValues}
            fatValues={fatValues}
            proteinValues={proteinValues}
            width={width}
          />
        </View>
      </>
    );
  } else {
    return <></>;
  }
};

export default MacroChart;
