import {
  Box,
  Flex,
  Input,
  Stack,
  Radio,
  Button,
  Heading,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

function SignUpForm() {
  return (
    <Flex width="full">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>

        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input type="name" placeholder="Please enter full name" />
            </FormControl>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio value="1">Male</Radio>
                  <Radio value="2">Female</Radio>
                  <Radio value="3">Other</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>

              <SingleDatepicker name="date-input" onDateChange={() => {}} />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input type="address" placeholder="Please enter address" />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Please enter email address" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Please enter password" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Please enter password" />
            </FormControl>
            <Button width="full" mt={8} type="submit">
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUpForm;
