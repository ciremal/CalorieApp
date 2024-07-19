import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const CompleteProfile = () => {
  const nav = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>CompleteProfile</Text>
    </View>
  );
};

export default CompleteProfile;
