import MealsHome from "@/pages/MealsHome/MealsHome";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function Index() {
  return (
    <PaperProvider>
      <MealsHome />
    </PaperProvider>
  );
}
