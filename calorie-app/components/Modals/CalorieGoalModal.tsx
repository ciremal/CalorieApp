import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { modalStyles } from "./ModalStyles";
import { Text, View } from "react-native";
import { Formik } from "formik";
import { SIZES } from "@/constants/sizes";
import { useState } from "react";

type CalorieGoalModalProps = {
  visible: boolean;
  hideModal: () => void;
  onSubmit: any;
  loading: boolean;
};

const CalorieGoalModal = ({
  visible,
  hideModal,
  onSubmit,
  loading,
}: CalorieGoalModalProps): JSX.Element => {
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
              initialValues={{ calGoal: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.calGoal) {
                  errors.calGoal = "Field is required";
                } else if (values.calGoal > 99999) {
                  errors.mealName = "Goal must be below 99999";
                }
                return errors;
              }}
              onSubmit={(values) => {
                onSubmit(values.calGoal);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>
                  <TextInput
                    label={"Calorie Goal"}
                    onChangeText={handleChange("calGoal")}
                    onBlur={handleBlur("calGoal")}
                    value={values.calGoal}
                    mode="outlined"
                    style={[modalStyles.textInput, { fontSize: SIZES.lg }]}
                    outlineColor={Colors.orange.text}
                    activeOutlineColor={Colors.lightOrange.text}
                    textColor={Colors.black.text}
                    inputMode="decimal"
                  />
                  {errors.calGoal && (
                    <Text
                      style={{
                        marginBottom: 10,
                        color: Colors.red.text,
                      }}
                    >
                      {errors.calGoal}
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
                      labelStyle={{ fontSize: SIZES.lg, paddingHorizontal: 10 }}
                      style={{ marginTop: 10 }}
                      onPress={() => handleSubmit()}
                      loading={loading}
                    >
                      Set Goal
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

export default CalorieGoalModal;
