import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";

export const ErrorAlert = (props: { message: String }) => {
  return (
    <Alert w="100%" status={"error"}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1} paddingX={3}>
            <Alert.Icon mt="1" />
            <Text fontSize="lg" color="coolGray.800">
              {props.message}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};
