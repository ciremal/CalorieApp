import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
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
import { SIZES } from "@/constants/sizes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EmptySearchResult } from "@/components/Alerts/Alerts";

const SearchFood = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { meal } = router.params;
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
      navigation.navigate("Food Edit", {
        meal: meal,
        foodId: foodId,
        measureId: measureId,
        foodName: foodName,
        measureOptions: JSON.stringify(measureOptions),
      });
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <Divider style={styles.divider} />
      <Stack.Screen
        options={{
          headerTitle: meal.title,
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
        {!isLoading && data.hints !== undefined ? (
          <ScrollView
            name={"search-suggestions"}
            style={pageStyles.searchSuggestions}
            scrollEnabled={data.hints.length > 0}
          >
            {data.hints.length > 0 ? (
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
              <EmptySearchResult
                message={`Sorry, we couldn't find any results for ${data.text}`}
              />
            )}
          </ScrollView>
        ) : (
          <ActivityIndicator
            animating={true}
            color={Colors.lightOrange.text}
            size={SIZES.xl3}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchFood;
