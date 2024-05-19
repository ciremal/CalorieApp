import { PaperProvider } from "react-native-paper";
import MealsHome from "@/screens/MealsHome/MealsHome";

const Home = () => {
  return (
    <PaperProvider>
      <MealsHome />
    </PaperProvider>
  );
};

export default Home;
