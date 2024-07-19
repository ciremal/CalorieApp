import { useNavigation } from "@react-navigation/native";
import { Button, Dimensions, Text, View } from "react-native";
import { ProfileStyles } from "./ProfileStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useGetUserById } from "@/api/user";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { ActivityIndicator } from "react-native-paper";
import { SIZES } from "@/constants/sizes";

const Profile = () => {
  const auth = getAuth();

  const { data, isFetching, error } = useGetUserById(auth.currentUser?.uid);

  const avatarSize = 100;

  const [height, setHeight] = useState(0);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={ProfileStyles.container}>
      {error && (
        <ErrorAlert
          message={"Could not load user information. Please try again later"}
        />
      )}
      {isFetching && !data && (
        <ActivityIndicator animating={true} color={Colors.orange.text} />
      )}
      {data && (
        <>
          <View
            style={[
              ProfileStyles.avatarContainer,
              {
                height: avatarSize,
                width: avatarSize,
                top: height - avatarSize / 2,
              },
            ]}
          >
            <EvilIcons name="user" size={avatarSize} color="black" />
          </View>

          <View style={ProfileStyles.headerContainer}>
            <LinearGradient
              onLayout={onLayout}
              colors={[Colors.lightOrange.text, Colors.orange.text]}
              start={[0, 0]}
              end={[1, 0]}
              style={ProfileStyles.linearGradientContainer}
            ></LinearGradient>
          </View>
          <View>
            <View style={{ marginTop: avatarSize / 1.5 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: SIZES.xl2,
                  fontWeight: "600",
                  letterSpacing: 1.5,
                }}
              >
                {data.name}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {data.email}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Profile;
