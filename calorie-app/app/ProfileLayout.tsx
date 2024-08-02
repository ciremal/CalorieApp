import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@/screens/Profile/Profile";
import CompleteProfile from "@/screens/CompleteProfile/CompleteProfile";
import WeightManagement from "@/screens/WeightManagement/WeightManagement";
import EditProfile from "@/screens/EditProfile/EditProfile";

const ProfileLayout = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator initialRouteName="Profile Home">
      <ProfileStack.Screen name="Profile Home" component={Profile} />
      <ProfileStack.Screen
        name="Complete Profile"
        component={CompleteProfile}
      />
      <ProfileStack.Screen name="Edit Profile" component={EditProfile} />
      <ProfileStack.Screen name="Weight Manager" component={WeightManagement} />
    </ProfileStack.Navigator>
  );
};

export default ProfileLayout;
