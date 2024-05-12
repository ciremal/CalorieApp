import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import totalsStyles from "./totalsStyles";
import roundNumbers from "../../helpers/roundNumbers";

const Totals = ({ meals }) => {
  const [totals, setTotals] = useState({
    fats: 0,
    carbs: 0,
    proteins: 0,
    cals: 0,
  });

  useEffect(() => {
    setTotals(calcTotals(meals));
  }, [meals]);

  return (
    <View style={totalsStyles.container}>
      <View style={totalsStyles.totalContainer}>
        <Text style={totalsStyles.textStyles}>Fats</Text>
        <Text style={totalsStyles.textStyles}>{totals.fats}</Text>
      </View>
      <View>
        <Text style={totalsStyles.textStyles}>Carbs</Text>
        <Text style={totalsStyles.textStyles}>{totals.carbs}</Text>
      </View>
      <View>
        <Text style={totalsStyles.textStyles}>Proteins</Text>
        <Text style={totalsStyles.textStyles}>{totals.proteins}</Text>
      </View>
      <View>
        <Text style={totalsStyles.textStylesCals}>Calories</Text>
        <Text style={totalsStyles.textStylesCals}>{totals.cals}</Text>
      </View>
    </View>
  );
};

const calcTotals = (meals) => {
  const result = { fats: 0, carbs: 0, proteins: 0, cals: 0 };

  meals.map((meal) => {
    result.fats = roundNumbers(result.fats + meal.fats);
    result.carbs = roundNumbers(result.carbs + meal.carbs);
    result.proteins = roundNumbers(result.proteins + meal.proteins);
    result.cals = roundNumbers(result.cals + meal.cals);
  });
  return result;
};

export default Totals;
