import { useEffect } from "react";

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

import { useNavigate } from "react-router-dom";

import * as routes from "../../routes/routes";

import { UserSignUp } from "../../types/userSingUp";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { signUpUser, clearState } from "../../features/user/userAuthSlice";

function SignUpForm() {
  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const dispatch = useAppDispatch();

  const { user, isLoginSuccess, error } = useAppSelector((state) => state.auth);

  const onSubmit = (data: UserSignUp) => dispatch(signUpUser(data));

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });

      dispatch(clearState());
    }

    if (isLoginSuccess) {
      toast({
        title: "User successfully registered",
        status: "success",
        isClosable: true,
      });

      navigate(routes.DASHBOARD);
    }
  }, [user, error, isLoginSuccess]);

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
              rules={{ required: "Gender is required" }}
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
              <Input
                size="md"
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
              />

              <FormErrorMessage>
                {errors.date && errors.date.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.address)}>
              <FormLabel>Address</FormLabel>
              <Input
                type="address"
                placeholder="Please enter address"
                {...register("address", {
                  required: "Address is required",
                })}
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
                {...register("email", {
                  required: "Email Address is required",
                })}
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
                {...register("password", {
                  required: "Password is required",
                })}
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
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
              />

              <FormErrorMessage>
                {errors.confirmPassword &&
                  errors.confirmPassword.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Button width="full" mt={8} type="submit">
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
