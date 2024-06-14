import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/sizes";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { deleteDialogStyles } from "./DeleteDialogStyles";

type DeleteDialogProps = {
  visible: boolean;
  hideDialog: () => void;
  onSubmit: any;
  id: string;
  title?: string;
  warning: string;
};

const DeleteDialog = ({
  visible,
  hideDialog,
  onSubmit,
  id,
  title,
  warning,
}: DeleteDialogProps): JSX.Element => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={deleteDialogStyles.dialog}
      >
        {title && (
          <Dialog.Title
            style={{
              fontSize: SIZES.lg,
              fontWeight: "bold",
              color: Colors.black.text,
            }}
          >
            {title}
          </Dialog.Title>
        )}
        <Dialog.Content>
          <Text variant="bodyLarge" style={{ color: Colors.black.text }}>
            {warning}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="outlined"
            buttonColor={Colors.lightWhite.text}
            textColor={Colors.black.text}
            style={deleteDialogStyles.dialogButton}
            contentStyle={{ paddingHorizontal: "6%" }}
            onPress={hideDialog}
          >
            Cancel
          </Button>
          <Button
            mode="outlined"
            buttonColor={Colors.red.text}
            textColor={Colors.lightWhite.text}
            style={deleteDialogStyles.dialogButton}
            contentStyle={{ paddingHorizontal: "6%" }}
            onPress={() => onSubmit(id, hideDialog)}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
