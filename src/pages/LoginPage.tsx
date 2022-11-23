import { Flex, Center, Box } from "@chakra-ui/react";

import LoginForm from "../components/login/LoginForm";
import { ReactComponent as LoginImage } from "../assets/images/login/4999291 1.svg";

function LoginPage() {
  return (
    <Box p="16">
      <Flex justifyContent="space-around">
        <LoginImage />

        <Center>
          <LoginForm />
        </Center>
      </Flex>
    </Box>
  );
}

export default LoginPage;
