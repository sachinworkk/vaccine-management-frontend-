import {
  Box,
  Link,
  Input,
  Stack,
  Button,
  Center,
  Heading,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import * as routes from "../../routes/routes";

import { AppError } from "../../types/appError";
import { UserLogin } from "../../types/userLogin";

import { signInSchema } from "../../schemas/signInSchema";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { loginUser, clearState } from "../../features/user/userAuthSlice";
import { saveAccessToken, saveRefreshToken } from "../../utils/localStorage";

function LoginForm() {
  const toast = useToast();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(signInSchema) });

  const { isLoading } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: UserLogin) => {
    try {
      const resp = await dispatch(loginUser(data)).unwrap();

      saveAccessToken(resp.accessToken);
      saveRefreshToken(resp.refreshToken);

      navigate(routes.DASHBOARD);
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
    <Stack spacing={12}>
      <Center>
        <Heading as="h1" size={{ md: "lg", lg: "lg", base: "md", sm: "md" }}>
          Vaccine Management System
        </Heading>
      </Center>

      <form onSubmit={handleSubmit((data) => onSubmit(data as UserLogin))}>
        <Box
          p={8}
          minWidth="400px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Center>
            <Heading
              as="h2"
              size={{ md: "lg", lg: "lg", base: "md", sm: "md" }}
            >
              Login
            </Heading>
          </Center>

          <Box my={4} textAlign="left">
            <Stack spacing={6}>
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

              <Button width="full" mt={8} type="submit" isLoading={isLoading}>
                Sign In
              </Button>
            </Stack>

            <Box mt={4}>
              Don't have an account?{" "}
              <Link color="teal.500" href={routes.SIGN_UP}>
                Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </Stack>
  );
}

export default LoginForm;
