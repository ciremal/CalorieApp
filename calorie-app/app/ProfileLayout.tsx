import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import Profile from "@/screens/Profile/Profile";
import CompleteProfile from "@/screens/CompleteProfile/CompleteProfile";

const ProfileLayout = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile Home"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="Profile Home" component={Profile} />
      <ProfileStack.Screen
        name="Complete Profile"
        component={CompleteProfile}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileLayout;
