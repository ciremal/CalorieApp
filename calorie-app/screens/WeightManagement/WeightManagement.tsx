import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

const WeightManagement = () => {
  const router = useRoute();
  const { user } = router.params;
  console.log(user);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default WeightManagement;
