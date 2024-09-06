import styles from "@/styles/general";
import { Text, View } from "react-native";

const ForgotPassword = () => {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Password Reset</Text>
    </View>
  );
};

export default ForgotPassword;
