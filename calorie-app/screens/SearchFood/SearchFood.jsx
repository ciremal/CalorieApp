import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { Stack } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import styles from "../../styles/general";
import { searchFoodStyles as pageStyles } from "./SearchFoodStyles";
import { useState } from "react";
import { useFetchFoodData } from "@/hooks/useFetchFoodData";
import SearchSuggestion from "../../components/SearchSuggestion/SearchSuggestion";
import { FlatList } from "react-native";
import { SIZES } from "../../constants/sizes";
import { useNavigation, useRoute } from "@react-navigation/native";

const SearchFood = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { mealName } = router.params;
  const [searchedFood, setSearchedFood] = useState("");
  const [textInputWidth, setTextInputWidth] = useState(0);
  const { data, isLoading, setQuery } = useFetchFoodData();

  const handleSelectedItem = (foodId, measureId, foodName, measures) => {
    const measureOptions = measures
      .map((item) => {
        return { label: item.label, weight: item.weight };
      })
      .filter((item) => item.label !== undefined);

    try {
      navigation.replace("Food Edit", {
        mealName: mealName,
        foodId: foodId,
        measureId: measureId,
        foodName: foodName,
        measureOptions: JSON.stringify(measureOptions),
      });
      // router.replace({
      //   pathname: "/mealEdit",
      //   params: {
      //     mealName,
      //     foodId,
      //     measureId,
      //     foodName,
      //     measureOptions: JSON.stringify(measureOptions),
      //   },
      // });
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <Divider style={styles.divider} />
      <Stack.Screen
        options={{
          headerTitle: mealName,
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
      <View style={pageStyles.container}>
        <View
          name={"search-input-container"}
          style={pageStyles.searchInputContainer}
        >
          <TextInput
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              if (width) setTextInputWidth(width);
            }}
            style={pageStyles.textInput}
            placeholder="Search"
            placeholderTextColor={Colors.grey.text}
            value={searchedFood}
            onChangeText={setSearchedFood}
          />
          <TouchableOpacity
            style={[
              pageStyles.searchInputIcon,
              { right: textInputWidth * 0.12 },
            ]}
            onPress={() => {
              setQuery(searchedFood);
              setSearchedFood("");
            }}
          >
            <AntDesign name="search1" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          name={"search-suggestions"}
          style={pageStyles.searchSuggestions}
        >
          {!isLoading && data.hints !== undefined ? (
            <FlatList
              data={data.hints}
              renderItem={({ item }) => (
                <SearchSuggestion
                  name={item.food.label}
                  cals={item.food.nutrients.ENERC_KCAL}
                  brand={item.food.brand}
                  foodId={item.food.foodId}
                  measures={item.measures}
                  handleSelectedItem={handleSelectedItem}
                />
              )}
              keyExtractor={(item, index) => item.food.foodId + index}
              scrollEnabled={false}
            />
          ) : (
            <ActivityIndicator
              animating={true}
              color={Colors.lightOrange.text}
              size={SIZES.xxlg}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchFood;
