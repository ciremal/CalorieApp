import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatsHome from "@/screens/StatsHome/StatsHome";

const StatsLayout = () => {
  const StatsStack = createNativeStackNavigator();

  return (
    <StatsStack.Navigator initialRouteName="Stats Home">
      <StatsStack.Screen
        name="Stats Home"
        component={StatsHome}
        options={{ headerTitle: "Stats" }}
      />
    </StatsStack.Navigator>
  );
};

export default StatsLayout;
