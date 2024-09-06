import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHome from "@/screens/AppHome/AppHome";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { MealContextProvider } from "@/hooks/useMealContext";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_APP } from "@/FirebaseConfig";
import AppSignUp from "@/screens/AppSignUp/AppSignUp";
import AppSignIn from "@/screens/AppSignIn/AppSignIn";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalorieTrackHome from "./CalorieTrackHome";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ProfileLayout from "./ProfileLayout";
import StatsLayout from "./StatsLayout";
import ForgotPassword from "@/screens/ForgotPassword/ForgotPassword";

const AuthenticationStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
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

  return (
    <MealContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer independent={true}>
          <PaperProvider>
            {user ? (
              <Tabs.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Tracker"
              >
                <Tabs.Screen
                  name="Tracker"
                  component={CalorieTrackHome}
                  options={{
                    tabBarActiveTintColor: Colors.orange.text,
                    tabBarIcon: () => (
                      <Ionicons name="fast-food" size={24} color="black" />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Stats"
                  component={StatsLayout}
                  options={{
                    tabBarActiveTintColor: Colors.orange.text,
                    tabBarIcon: () => (
                      <Ionicons name="stats-chart" size={24} color="black" />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Profile"
                  component={ProfileLayout}
                  options={{
                    tabBarActiveTintColor: Colors.orange.text,
                    tabBarIcon: () => (
                      <Feather name="user" size={24} color="black" />
                    ),
                  }}
                />
              </Tabs.Navigator>
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
                <AuthenticationStack.Screen
                  name="Forgot Password"
                  component={ForgotPassword}
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
