import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsHome from "@/screens/MealsHome/MealsHome";
import MealSummary from "@/screens/MealSummary/MealSummary";
import SearchFood from "@/screens/SearchFood/SearchFood";
import FoodNutritionEdit from "@/screens/FoodNutritionEdit/FoodNutritionEdit";
import AppHome from "@/screens/AppHome/AppHome";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { MealContextProvider } from "@/hooks/useMealContext";
import FoodNutritionEditManual from "@/screens/FoodNutritionEditManual/FoodNutritionEditManual";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_APP } from "@/FirebaseConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import AppSignUp from "@/screens/AppSignUp/AppSignUp";
import AppSignIn from "@/screens/AppSignIn/AppSignIn";

const MealTrackingStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const queryClient = new QueryClient();
LogBox.ignoreAllLogs();

const Home = () => {
  const auth = getAuth(FIREBASE_APP);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  console.log(user);

  return (
    <MealContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer independent={true}>
          <PaperProvider>
            {user ? (
              <MealTrackingStack.Navigator
                initialRouteName="Meal Home"
                screenOptions={{
                  headerStyle: { backgroundColor: Colors.lightWhite.text },
                }}
              >
                <MealTrackingStack.Screen
                  name="Meal Home"
                  component={MealsHome}
                />
                <MealTrackingStack.Screen
                  name="Meal Summary"
                  component={MealSummary}
                />
                <MealTrackingStack.Screen
                  name="Search Food"
                  component={SearchFood}
                />
                <MealTrackingStack.Screen
                  name="Food Edit"
                  component={FoodNutritionEdit}
                />
                <MealTrackingStack.Screen
                  name="Food Edit Manual"
                  component={FoodNutritionEditManual}
                />
              </MealTrackingStack.Navigator>
            ) : (
              <AuthenticationStack.Navigator
                screenOptions={{ headerShown: false }}
              >
                <AuthenticationStack.Screen
                  name="Home Screen"
                  component={AppHome}
                />
                <AuthenticationStack.Screen
                  name="Sign Up Screen"
                  component={AppSignUp}
                />
                <AuthenticationStack.Screen
                  name="Sign In Screen"
                  component={AppSignIn}
                />
              </AuthenticationStack.Navigator>
            )}
          </PaperProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </MealContextProvider>
  );
};

export default Home;
