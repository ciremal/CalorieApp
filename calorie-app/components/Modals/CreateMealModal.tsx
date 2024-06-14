import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { modalStyles } from "./ModalStyles";
import { Text, View } from "react-native";
import { Formik } from "formik";

type CreateMealModalProps = {
  visible: boolean;
  hideModal: () => void;
  onSubmit: (values: any) => Promise<void>;
};

const CreateMealModal = ({
  visible,
  hideModal,
  onSubmit,
}: CreateMealModalProps): JSX.Element => {
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyles.modal}
        >
          <View style={modalStyles.modalContentContainer}>
            <Formik
              initialValues={{ mealName: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.mealName) {
                  errors.mealName = "Meal name is required";
                } else if (values.mealName.length > 25) {
                  errors.mealName =
                    "Meal name should be between 1 and 25 characters";
                }
                return errors;
              }}
              onSubmit={(values) => {
                onSubmit(values.mealName);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>
                  <TextInput
                    label={"Meal Name"}
                    onChangeText={handleChange("mealName")}
                    onBlur={handleBlur("mealName")}
                    value={values.mealName}
                    mode="outlined"
                    style={modalStyles.textInput}
                    outlineColor={Colors.orange.text}
                    activeOutlineColor={Colors.lightOrange.text}
                    textColor={Colors.black.text}
                  />
                  {errors.mealName && (
                    <Text
                      style={{
                        marginBottom: 10,
                        color: Colors.red.text,
                      }}
                    >
                      {errors.mealName}
                    </Text>
                  )}
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      mode="contained"
                      textColor={Colors.black.text}
                      buttonColor={Colors.lightOrange.text}
                      labelStyle={{ fontSize: 18 }}
                      style={{ width: "40%", marginTop: 10 }}
                      onPress={() => handleSubmit()}
                    >
                      Add
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default CreateMealModal;
