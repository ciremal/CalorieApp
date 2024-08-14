import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { LineChart } from "react-native-gifted-charts";

type CalorieSummaryChartProps = {
  dataset: any[];
  values: any[];
  width: number;
  calGoal: number;
};

const CalorieSummaryChart = ({
  dataset,
  values,
  width,
  calGoal,
}: CalorieSummaryChartProps) => {
  const getStep = (values: any) => {
    const res = Math.max(...values) / 8;
    return res === 0 ? 1 : res;
  };

  return (
    <LineChart
      data={dataset}
      color={Colors.orange.text}
      showReferenceLine1
      referenceLine1Position={calGoal}
      referenceLine1Config={{ color: Colors.orange.text }}
      width={width * 0.9}
      hideRules
      showVerticalLines
      stepHeight={25}
      adjustToWidth
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
      stepValue={getStep(values)}
      xAxisLabelTextStyle={{ color: "black", fontSize: 9 }}
    />
  );
};

export default CalorieSummaryChart;
