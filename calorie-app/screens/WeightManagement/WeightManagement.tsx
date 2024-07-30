import { Colors } from "@/constants/Colors";
import styles from "@/styles/general";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { weightManagementStyles as pageStyles } from "./WeightManagementStyles";
import { useState } from "react";
import { SIZES } from "@/constants/sizes";
import roundNumbers from "@/helpers/roundNumbers";

const WeightManagement = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { user } = router.params;
  console.log(user);

  const [placeholder, setPlaceHolder] = useState(user.currentWeight.toString());

  const renderWeightHistoryItem = (item: any) => {
    return (
      <View
        style={{
          paddingHorizontal: "3%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: SIZES.lg }}>{item.weight}kg</Text>
        <Text style={{ fontSize: SIZES.lg, fontStyle: "italic" }}>
          {item.date}
        </Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.body}>
        <Divider style={styles.divider} />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: Colors.lightWhite.text },
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
        <View id="weight-management-container" style={{ flex: 1 }}>
          <View style={pageStyles.WMContainer}>
            <View style={pageStyles.WMCurrentWeightContainer}>
              <View style={pageStyles.WMCurrentWeightTextInputContainer}>
                <TouchableOpacity
                  onPress={() => {
                    const newPlaceholder = roundNumbers(
                      parseFloat(placeholder) + 0.1
                    );
                    setPlaceHolder(newPlaceholder.toString());
                  }}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={SIZES.xl2}
                    color={Colors.orange.text}
                  />
                </TouchableOpacity>
                <TextInput
                  style={pageStyles.WMCurrentWeightTextInput}
                  inputMode="decimal"
                  placeholder={placeholder}
                  placeholderTextColor={Colors.black.text}
                  onPressIn={() => setPlaceHolder("")}
                  onEndEditing={() =>
                    setPlaceHolder(user.currentWeight.toString())
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    const newPlaceholder = roundNumbers(
                      parseFloat(placeholder) - 0.1
                    );
                    setPlaceHolder(newPlaceholder.toString());
                  }}
                >
                  <AntDesign
                    name="minuscircleo"
                    size={SIZES.xl2}
                    color={Colors.orange.text}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={pageStyles.WMCurrentWeightTextInputLabel}>
                  Current Weight (kg)
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View style={pageStyles.WMWeightContainer}>
                <View style={pageStyles.WMWeightTextInputContainer}>
                  <TextInput
                    style={pageStyles.WMWeightTextInput}
                    placeholder={user.startWeight.toString()}
                    placeholderTextColor={Colors.black.text}
                  />
                </View>
                <View>
                  <Text style={pageStyles.WMWeightTextInputLabel}>
                    Starting Weight
                  </Text>
                </View>
              </View>
              <View style={pageStyles.WMWeightContainer}>
                <View style={pageStyles.WMWeightTextInputContainer}>
                  <TextInput
                    style={pageStyles.WMWeightTextInput}
                    placeholder={user.weightGoal.toString()}
                    placeholderTextColor={Colors.black.text}
                    editable={false}
                  />
                </View>
                <View>
                  <Text style={pageStyles.WMWeightTextInputLabel}>
                    Weight Goal
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: "20%", width: "100%" }}>
            <Text style={{ paddingLeft: "3%", fontSize: SIZES.xl }}>
              Weight Change History
            </Text>
            <Divider
              style={{
                backgroundColor: Colors.orange.text,
                marginVertical: "2%",
                height: 1,
              }}
            />
            <View>
              <FlatList
                data={user.weightHistory}
                renderItem={({ item }) => renderWeightHistoryItem(item)}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WeightManagement;
