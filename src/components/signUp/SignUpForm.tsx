import {
  Box,
  Link,
  Input,
  Stack,
  Radio,
  Center,
  Button,
  Heading,
  FormLabel,
  RadioGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { useNavigate } from "react-router-dom";

import * as routes from "../../routes/routes";

import { AppError } from "../../types/appError";
import { UserSignUp } from "../../types/userSingUp";

import { useAppDispatch } from "../../hooks/hooks";

import { signUpSchema } from "../../schemas/signUpSchema";

import { signUpUser, clearState } from "../../features/user/userAuthSlice";

function SignUpForm() {
  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: joiResolver(signUpSchema) });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: UserSignUp) => {
    try {
      await dispatch(signUpUser(data)).unwrap();

      toast({
        title: "User successfully registered",
        status: "success",
        isClosable: true,
      });

      navigate(routes.SIGN_IN);
    } catch (error) {
      toast({
        title: (error as AppError).details,
        status: "error",
        isClosable: true,
      });

      dispatch(clearState());
    }
  };

  return (
    <Box p={8} minWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Center>
        <Heading as="h1" size={{ md: "lg", lg: "lg", base: "md", sm: "md" }}>
          Sign Up
        </Heading>
      </Center>

      <form onSubmit={handleSubmit((data) => onSubmit(data as UserSignUp))}>
        <Box my={4} textAlign="left">
          <Stack spacing={6}>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="name"
                placeholder="Please enter full name"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              <FormErrorMessage>
                {errors.name && errors.name.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={Boolean(errors.gender)}>
                  <FormLabel>Gender</FormLabel>

                  <RadioGroup onChange={onChange} value={value}>
                    <Stack direction="row">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>
                    {errors.gender && errors.gender.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            ></Controller>

            <FormControl isInvalid={Boolean(errors.dateOfBirth)}>
              <FormLabel>Date Of Birth</FormLabel>
              <Input size="md" type="date" {...register("dateOfBirth")} />

              <FormErrorMessage>
                {errors.dateOfBirth && errors.dateOfBirth.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.address)}>
              <FormLabel>Address</FormLabel>
              <Input
                type="address"
                placeholder="Please enter address"
                {...register("address")}
              />

              <FormErrorMessage>
                {errors.address && errors.address.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Please enter email address"
                {...register("email")}
              />

              <FormErrorMessage>
                {errors.email && errors.email.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Please enter password"
                {...register("password")}
              />

              <FormErrorMessage>
                {errors.password && errors.password.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.confirmPassword)}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Please enter password"
                {...register("confirmPassword")}
              />

              <FormErrorMessage>
                {errors.confirmPassword &&
                  errors.confirmPassword.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Button width="full" mt={8} type="submit" data-testid="sign-up-btn">
            Sign Up
          </Button>
          <Box mt={4}>
            Already have an account?{" "}
            <Link color="teal.500" href={routes.SIGN_IN}>
              Sign In
            </Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default SignUpForm;
