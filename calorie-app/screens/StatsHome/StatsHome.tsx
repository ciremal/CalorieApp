import { ScrollView, View } from "react-native";
import styles from "@/styles/general";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { ActivityIndicator } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { useGetUserById } from "@/api/user";
import CalorieChart from "@/components/StatsComponents/CalorieChart";
import MacroChart from "@/components/StatsComponents/MacroChart";

const StatsHome = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const { data, isFetching, error } = useGetUserById(user?.uid);

  return (
    <ScrollView>
      <View style={styles.body}>
        {error && (
          <ErrorAlert
            message={"Could not load charts. Please try again later"}
          />
        )}
        {isFetching && !data && (
          <ActivityIndicator
            animating={true}
            color={Colors.orange.text}
            style={{ marginTop: "30%" }}
            size={SIZES.xl3}
          />
        )}
        {!isFetching && data && (
          <View>
            <CalorieChart userData={data} />
            <MacroChart userData={data} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default StatsHome;
