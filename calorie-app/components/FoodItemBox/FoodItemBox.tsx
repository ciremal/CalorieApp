import { View, Text, TouchableOpacity } from "react-native";
import { foodItemBoxStyles } from "./FoodItemBoxStyles";
import { Colors } from "@/constants/Colors";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { SIZES } from "@/constants/sizes";
import Accordion from "../Accordion/Accordion";

type FoodItemBoxProps = {
  foodItem: any;
  handleDelete: (foodId: string, hideDialog: () => void) => void;
};

const FoodItemBox = ({ foodItem, handleDelete }: FoodItemBoxProps) => {
  const {
    _id: id,
    name,
    quantity,
    unitOfMeasurement,
    mainNutrients,
    notes,
  } = foodItem;
  const { cals, carbs, fats, proteins } = mainNutrients;

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [openNotes, setOpenNotes] = useState(false);

  const Notes = () => {
    return (
      <View
        style={[
          foodItemBoxStyles.notesDropdown,
          foodItemBoxStyles.roundedCornersBottom,
        ]}
      >
        <Text style={foodItemBoxStyles.notes}>{notes}</Text>
      </View>
    );
  };

  return (
    <View style={foodItemBoxStyles.foodBox}>
      <View
        style={[
          foodItemBoxStyles.foodBoxLayer1,
          foodItemBoxStyles.roundedCornersTop,
        ]}
      >
        <Text style={foodItemBoxStyles.foodItemTitle}>
          {`${name} (${quantity} ${unitOfMeasurement})`}
        </Text>
        <TouchableOpacity onPress={() => showDialog()}>
          <FontAwesome name="trash-o" size={32} color={Colors.black.text} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          foodItemBoxStyles.foodBoxLayer2,
          !notes ? foodItemBoxStyles.roundedCornersBottom : null,
        ]}
      >
        <Text style={foodItemBoxStyles.nutritionNumber}>{fats}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{carbs}</Text>
        <Text style={foodItemBoxStyles.nutritionNumber}>{proteins}</Text>
        <Text style={foodItemBoxStyles.nutritionNumberCalorie}>{cals}</Text>
      </View>

      {notes && (
        <>
          <TouchableOpacity
            style={[
              foodItemBoxStyles.foodBoxLayer1,
              !openNotes ? foodItemBoxStyles.roundedCornersBottom : null,
              {
                marginBottom: -1,
                paddingHorizontal: "7%",
                paddingVertical: "4%",
              },
            ]}
            onPress={() => setOpenNotes(!openNotes)}
            activeOpacity={0.7}
          >
            <Text
              style={{
                fontSize: SIZES.md,
                color: Colors.lightWhite.text,
                fontWeight: "500",
              }}
            >
              Notes
            </Text>
            <AntDesign
              name={openNotes ? "caretup" : "caretdown"}
              size={SIZES.md}
              color={Colors.lightWhite.text}
            />
          </TouchableOpacity>
          <View>
            <Accordion open={openNotes} item={Notes} />
          </View>
        </>
      )}

      <DeleteDialog
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={handleDelete}
        id={id}
        warning={`Are you sure you want to delete ${name} from this meal?`}
      />
    </View>
  );
};

export default FoodItemBox;
