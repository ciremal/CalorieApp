import CompleteProfileForm from "@/components/Forms/CompleteProfileForm";
import { Colors } from "@/constants/Colors";
import styles from "@/styles/general";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";

const CompleteProfile = () => {
  const router = useRoute();
  const navigation = useNavigation();

  const { userInfo } = router.params;

  console.log(userInfo);

  return (
    <ScrollView style={{ backgroundColor: Colors.lightWhite.text }}>
      <Stack.Screen
        options={{
          headerTitle: "Complete Profile Form",
          headerStyle: styles.header,
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={32}
                  color={Colors.orange.text}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
          marginBottom: "10%",
        }}
      >
        <CompleteProfileForm name={userInfo.name} id={userInfo._id} />
      </View>
    </ScrollView>
  );
};

export default CompleteProfile;
