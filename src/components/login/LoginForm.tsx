import {
  Box,
  Flex,
  Link,
  Input,
  Stack,
  Button,
  Heading,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

function LoginForm() {
  return (
    <Flex width="full">
      <Box
        p={8}
        minWidth="400px"
        height="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>

        <Box my={4} textAlign="left">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Please enter email address" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Please enter password" />
            </FormControl>
            <Button width="full" mt={8} type="submit">
              Sign In
            </Button>
          </Stack>

          <Box mt={4}>
            Don't have an account?{" "}
            <Link color="teal.500" href="/signup">
              Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginForm;
