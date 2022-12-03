import { Button } from "@chakra-ui/react";

import { FiPlus } from "react-icons/fi";

function FloatingButton(props: any) {
  return (
    <Button
      borderRadius="50%"
      pos="fixed"
      colorScheme="red"
      bottom="40px"
      right="30px"
      width="60px"
      height="60px"
      onClick={props.onClick}
    >
      <FiPlus />
    </Button>
  );
}

export default FloatingButton;
