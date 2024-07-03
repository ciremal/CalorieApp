import React from "react";
import { Modal, Portal } from "react-native-paper";
import { modalStyles } from "./ModalStyles";
import { FlatList, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";

type ItemProps = {
  label: string;
  quantity: number;
  unit: string;
  bold: string;
};

const Item = ({ label, quantity, unit, bold }: ItemProps) => {
  return (
    <View style={modalStyles.nutrientBreakdownRenderItem}>
      <Text style={{ fontWeight: bold }}>{label}</Text>
      <Text style={{ fontWeight: bold }}>{`${quantity} ${unit}`}</Text>
    </View>
  );
};

type NutrientBreakdownModalProps = {
  visible: boolean;
  hideModal: () => void;
  nutrients: any[];
};

const NutrientBreakdownModal = ({
  visible,
  hideModal,
  nutrients,
}: NutrientBreakdownModalProps): JSX.Element => {
  const mainNutrients = ["Calories", "Carbs", "Fats", "Proteins"];
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyles.modal}
        >
          <View
            style={[
              modalStyles.modalContentContainer,
              { marginVertical: "5%" },
            ]}
          >
            <Text style={{ fontSize: SIZES.lg, textAlign: "center" }}>
              Nutrient Breakdown
            </Text>
            <FlatList
              data={nutrients}
              renderItem={({ item }) => (
                <Item
                  label={item.label}
                  quantity={item.quantity}
                  unit={item.unit}
                  bold={mainNutrients.includes(item.label) ? "700" : "400"}
                />
              )}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default NutrientBreakdownModal;
