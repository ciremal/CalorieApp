import { AntDesign, Entypo } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { modalStyles } from "./ModalStyles";
import { StyleSheet } from "react-native";
import { SIZES } from "@/constants/sizes";
import styles from "../../styles/general";
import { Colors } from "@/constants/Colors";

type CreateFoodItemModalProps = {
  visible: boolean;
  hideModal: () => void;
  navigation: any;
};

const CreateFoodItemModal = ({
  visible,
  hideModal,
  navigation,
}: CreateFoodItemModalProps): JSX.Element => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={modalStyles.modal}
      >
        <View
          style={[
            modalStyles.modalContentContainer,
            { flexDirection: "row", justifyContent: "space-evenly" },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search Food");
              hideModal();
            }}
          >
            <View style={[pageStyles.addFoodOption, styles.raisedStyle]}>
              <AntDesign name="search1" size={SIZES.xl3} color="black" />
              <Text style={pageStyles.addFoodOptionText}>Search</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[pageStyles.addFoodOption, styles.raisedStyle]}>
              <Entypo name="pencil" size={SIZES.xl3} color="black" />
              <Text style={pageStyles.addFoodOptionText}>Manual</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

export default CreateFoodItemModal;

const pageStyles = StyleSheet.create({
  addFoodOption: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.orange.text,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 3,
  },

  addFoodOptionText: {
    color: Colors.black.text,
    fontSize: 18,
  },
});
