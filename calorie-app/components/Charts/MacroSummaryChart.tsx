import { Colors } from "@/constants/Colors";
import { LineChart } from "react-native-gifted-charts";

type MacroSummaryChartProps = {
  datasetCarbs: any[];
  datasetFats: any[];
  datasetProteins: any[];
  showCarbs: boolean;
  showFats: boolean;
  showProteins: boolean;
  carbValues: any[];
  fatValues: any[];
  proteinValues: any[];
  width: number;
};

const MacroSummaryChart = ({
  datasetCarbs,
  datasetFats,
  datasetProteins,
  showCarbs,
  showFats,
  showProteins,
  carbValues,
  fatValues,
  proteinValues,
  width,
}: MacroSummaryChartProps) => {
  const getStep = (
    carbValues: number[],
    fatValues: number[],
    proteinValues: number[]
  ) => {
    const res = Math.max(...carbValues, ...fatValues, ...proteinValues) / 10;
    return res === 0 ? 1 : Math.ceil(res / 10) * 10;
  };

  return (
    <LineChart
      data={datasetCarbs}
      data2={datasetFats}
      data3={datasetProteins}
      color1={showCarbs ? Colors.carbs : "transparent"}
      color2={showFats ? Colors.fats : "transparent"}
      color3={showProteins ? Colors.proteins : "transparent"}
      dataPointsColor1={showCarbs ? Colors.carbs : "transparent"}
      dataPointsColor2={showFats ? Colors.fats : "transparent"}
      dataPointsColor3={showProteins ? Colors.proteins : "transparent"}
      width={width * 0.9}
      hideRules
      spacing={80}
      showVerticalLines
      stepHeight={25}
      adjustToWidth
      endSpacing={30}
      initialSpacing={30}
      stepValue={getStep(carbValues, fatValues, proteinValues)}
      xAxisLabelTextStyle={{ color: "black", fontSize: 9 }}
    />
  );
};

export default MacroSummaryChart;
