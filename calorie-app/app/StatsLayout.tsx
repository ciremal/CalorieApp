import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatsHome from "@/screens/StatsHome/StatsHome";
import { Colors } from "@/constants/Colors";

const StatsLayout = () => {
  const StatsStack = createNativeStackNavigator();

  return (
    <StatsStack.Navigator
      initialRouteName="Stats Home"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.lightWhite.text },
      }}
    >
      <StatsStack.Screen
        name="Stats Home"
        component={StatsHome}
        options={{ headerTitle: "Stats" }}
      />
    </StatsStack.Navigator>
  );
};

export default StatsLayout;
