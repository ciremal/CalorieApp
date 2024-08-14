import roundNumbers from "@/helpers/roundNumbers";
import { Text, View } from "react-native";

type MacroChartInfo = {
  values: number[];
  macro: string;
};

const MacroChartInfo = ({ values, macro }: MacroChartInfo) => {
  const getTotalMacro = (values: any) => {
    return roundNumbers(
      values.reduce((sum: number, curr: number) => sum + curr, 0)
    );
  };

  const getAverageMacro = (values: any) => {
    const sum = getTotalMacro(values);
    return roundNumbers(sum / values.length);
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>
          Total {macro}: {getTotalMacro(values)}g
        </Text>
        <Text>
          Average {macro}: {getAverageMacro(values)}g
        </Text>
      </View>
    </View>
  );
};

export default MacroChartInfo;
