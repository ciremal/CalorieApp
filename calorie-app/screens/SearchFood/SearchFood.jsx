import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { Stack } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import styles from "../../styles/general";
import { searchFoodStyles as pageStyles } from "./SearchFoodStyles";
import { useContext, useState } from "react";
import { useFetchFoodData } from "@/hooks/useFetchFoodData";
import SearchSuggestion from "../../components/SearchSuggestion/SearchSuggestion";
import { SIZES } from "@/constants/sizes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EmptySearchResult } from "@/components/Alerts/Alerts";
import { MealContext } from "@/hooks/useMealContext";

const SearchFood = () => {
  const { selectedMeal } = useContext(MealContext);

  const navigation = useNavigation();

  const [searchedFood, setSearchedFood] = useState("");
  const [lastSearched, setLastSearched] = useState();
  const [textInputWidth, setTextInputWidth] = useState(0);

  const { data, isLoading, setQuery, error } = useFetchFoodData();
  const handleSelectedItem = (foodId, measureId, foodName, measures) => {
    const measureOptions = measures
      .map((item) => {
        return { label: item.label, weight: item.weight };
      })
      .filter((item) => item.label !== undefined);

    try {
      navigation.navigate("Food Edit", {
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
          headerTitle: selectedMeal.title,
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
              setLastSearched(searchedFood);
              setSearchedFood("");
            }}
          >
            <AntDesign name="search1" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {error && (
          <ErrorAlert
            message={"Could not load meals. Please try again later"}
          />
        )}
        {(isLoading || !data.hints) && (
          <ActivityIndicator
            animating={true}
            color={Colors.lightOrange.text}
            size={SIZES.xl3}
            style={{ marginTop: 25 }}
          />
        )}
        {!isLoading && data.hints !== undefined && (
          <ScrollView
            name={"search-suggestions"}
            style={pageStyles.searchSuggestions}
            scrollEnabled={data.hints.length > 0}
          >
            {lastSearched && (
              <Text
                style={{ marginLeft: 10, marginBottom: 3, fontSize: SIZES.md }}
              >
                Search results for{" "}
                <Text style={{ fontStyle: "italic" }}>{lastSearched}</Text>
              </Text>
            )}
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchFood;
