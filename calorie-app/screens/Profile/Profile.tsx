import { useNavigation } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { ProfileStyles } from "./ProfileStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useGetUserById } from "@/api/user";
import { ErrorAlert } from "@/components/Alerts/Alerts";
import { ActivityIndicator, Divider } from "react-native-paper";
import { SIZES } from "@/constants/sizes";
import { Stack } from "expo-router";
import { Bar } from "react-native-progress";
import { getAge } from "@/helpers/dates";
import { ScrollView } from "react-native";

const Profile = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  const { data, isFetching, error } = useGetUserById(auth.currentUser?.uid);

  const avatarSize = 100;

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    setHeight(height);
    setWidth(width);
  };

  return (
    <View style={ProfileStyles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {error && (
        <ErrorAlert
          message={"Could not load user information. Please try again later"}
        />
      )}
      {isFetching && !data && (
        <ActivityIndicator animating={true} color={Colors.orange.text} />
      )}
      {data && (
        <ScrollView style={{ width: "100%" }}>
          <View
            style={[
              ProfileStyles.avatarContainer,
              {
                height: avatarSize,
                width: avatarSize,
                top: height - avatarSize / 2,
                left: width / 2 - avatarSize / 2,
              },
            ]}
          >
            <EvilIcons name="user" size={avatarSize} color="black" />
          </View>

          <View style={{ width: "100%" }}>
            <View style={ProfileStyles.headerContainer}>
              <LinearGradient
                onLayout={onLayout}
                colors={[Colors.lightOrange.text, Colors.orange.text]}
                start={[0, 0]}
                end={[1, 0]}
                style={ProfileStyles.linearGradientContainer}
              ></LinearGradient>
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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

              {data.profileComplete ? (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "20%",
                    marginTop: "7%",
                  }}
                >
                  <TouchableOpacity style={ProfileStyles.personalInfoContainer}>
                    <View style={ProfileStyles.personalInfoTitleContainer}>
                      <Text style={ProfileStyles.infoTitle}>
                        Personal Information
                      </Text>
                    </View>
                    <View style={ProfileStyles.personalInfoRowContainer}>
                      <View style={{ width: "60%" }}>
                        <Text style={ProfileStyles.personalInfoItemText}>
                          Age: {getAge(data.DOB)} years old
                        </Text>
                      </View>
                      <View style={{ width: "40%" }}>
                        <Text style={ProfileStyles.personalInfoItemText}>
                          Gender: {data.gender}
                        </Text>
                      </View>
                    </View>
                    <View style={ProfileStyles.personalInfoRowContainer}>
                      <View style={{ width: "60%" }}>
                        <Text style={ProfileStyles.personalInfoItemText}>
                          Height: {data.height}cm
                        </Text>
                      </View>
                      <View style={{ width: "40%" }}>
                        <Text style={ProfileStyles.personalInfoItemText}>
                          Physical Activity Level: {data.PA}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={ProfileStyles.myWeightContainer}>
                    <Text style={ProfileStyles.infoTitle}>My Weight</Text>
                    <View style={ProfileStyles.myWeightProgressBarContainer}>
                      <Bar
                        progress={0.3}
                        width={null}
                        style={{ width: "100%" }}
                        height={10}
                        color={Colors.orange.text}
                      />
                      <View
                        style={
                          ProfileStyles.myWeightProgressBarNumbersContainer
                        }
                      >
                        <Text style={ProfileStyles.myWeightProgressBarNumbers}>
                          {data.weight}kg
                        </Text>
                        <Text
                          style={[
                            ProfileStyles.myWeightProgressBarNumbers,
                            { fontWeight: "700" },
                          ]}
                        >
                          {data.weight}kg
                        </Text>
                        <Text style={ProfileStyles.myWeightProgressBarNumbers}>
                          {data.weightGoal}kg
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flex: 1, marginTop: "25%" }}>
                  <Button
                    title="Complete Your Profile"
                    onPress={() =>
                      navigation.navigate("Complete Profile", {
                        userInfo: data,
                      })
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
