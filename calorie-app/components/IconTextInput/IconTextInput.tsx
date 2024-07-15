import { Colors } from "@/constants/Colors";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { ReactNode } from "react";
import { View } from "react-native";

type IconTextInputProps = {
  Icon: Icon<any, any>;
  iconProps: any;
  TextInput: any;
  textInputProps: any;
};

const IconTextInput = ({
  Icon,
  iconProps,
  TextInput,
  textInputProps,
}: IconTextInputProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.bleachOrange.text,
        width: "100%",
        borderRadius: 8,
        paddingHorizontal: 10,
        columnGap: "10%",
      }}
    >
      <Icon {...iconProps} />
      <TextInput {...textInputProps} />
    </View>
  );
};

export default IconTextInput;
