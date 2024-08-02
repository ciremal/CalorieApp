import { Colors } from "@/constants/Colors";
import styles from "@/styles/general";
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
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
import { useEffect, useState } from "react";
import { SIZES } from "@/constants/sizes";
import { useMutation, useQueryClient } from "react-query";
import { useUpdateUserWeight } from "@/api/user";
import { dateToday } from "@/helpers/dates";

const WeightManagement = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { user } = router.params;

  const [currentWeightPH, setCurrentWeightPH] = useState(
    user.currentWeight.toString()
  );
  const [startWeightPH, setStartWeightPH] = useState(
    user.startWeight.toString()
  );
  const [weightGoalPH, setWeightGoalPH] = useState(user.weightGoal.toString());

  const [currentWeight, setCurrentWeight] = useState(user.currentWeight);
  const [startWeight, setStartWeight] = useState(user.startWeight);
  const [weightGoal, setWeightGoal] = useState(user.weightGoal);

  const [enableSave, setEnableSave] = useState(false);

  useEffect(() => {
    if (
      currentWeight !== user.currentWeight ||
      startWeight !== user.startWeight ||
      weightGoal !== user.weightGoal
    ) {
      setEnableSave(true);
    } else {
      setEnableSave(false);
    }
  }, [currentWeight, startWeight, weightGoal]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: useUpdateUserWeight,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getUserById", user._id],
        active: true,
      });
      navigation.navigate("Profile Home");
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const handleSaveChanges = () => {
    const id = user._id;
    const weightLog = {
      weight: currentWeight,
      date: dateToday,
    };

    if (currentWeight !== user.currentWeight) {
      mutate({ id, currentWeight, startWeight, weightGoal, weightLog });
    } else {
      mutate({ id, currentWeight, startWeight, weightGoal });
    }
  };

  const renderWeightHistoryItem = (item: any) => {
    return (
      <View
        style={{
          paddingHorizontal: "3%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2%",
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
            headerRight: () => {
              return (
                <TouchableOpacity
                  disabled={!enableSave}
                  onPress={handleSaveChanges}
                >
                  <Fontisto
                    name="save"
                    size={24}
                    color={
                      enableSave ? Colors.orange.text : Colors.bleachOrange.text
                    }
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
                <TextInput
                  style={pageStyles.WMCurrentWeightTextInput}
                  inputMode="decimal"
                  placeholder={currentWeightPH}
                  placeholderTextColor={Colors.black.text}
                  onPressIn={() => setCurrentWeightPH("")}
                  onEndEditing={() =>
                    setCurrentWeightPH(user.currentWeight.toString())
                  }
                  onChangeText={(value) =>
                    value === ""
                      ? setCurrentWeight(user.currentWeight)
                      : setCurrentWeight(parseFloat(value))
                  }
                />
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
                    inputMode="decimal"
                    placeholder={startWeightPH}
                    placeholderTextColor={Colors.black.text}
                    onPressIn={() => setStartWeightPH("")}
                    onEndEditing={() =>
                      setStartWeightPH(user.startWeight.toString())
                    }
                    onChangeText={(value) =>
                      value === ""
                        ? setStartWeight(user.startWeight)
                        : setStartWeight(parseFloat(value))
                    }
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
                    inputMode="decimal"
                    placeholder={weightGoalPH}
                    placeholderTextColor={Colors.black.text}
                    onPressIn={() => setWeightGoalPH("")}
                    onEndEditing={() =>
                      setWeightGoalPH(user.weightGoal.toString())
                    }
                    onChangeText={(value) =>
                      value === ""
                        ? setWeightGoal(user.weightGoal)
                        : setWeightGoal(parseFloat(value))
                    }
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
