import {
  Box,
  Input,
  Modal,
  Select,
  Button,
  Divider,
  Textarea,
  Checkbox,
  FormLabel,
  ModalBody,
  NumberInput,
  ModalHeader,
  ModalFooter,
  FormControl,
  ModalContent,
  ModalOverlay,
  NumberInputField,
  FormErrorMessage,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { Controller, useForm } from "react-hook-form";

function AddVaccineForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Vaccine</ModalHeader>
          <Divider />

          <ModalBody>
            <form
              id="add-vaccine-form"
              onSubmit={handleSubmit((data) => console.log(data))}
            >
              <Box p={4} display="flex" flexDirection="column" gap="16px">
                <FormControl isInvalid={Boolean(errors.name)}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="name"
                    placeholder="Please enter name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message?.toString()}
                  </FormErrorMessage>
                </FormControl>

                <Controller
                  name="stage"
                  control={control}
                  rules={{ required: "Stage is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={Boolean(errors.stage)}>
                      <FormLabel>Stage</FormLabel>
                      <Select
                        value={value}
                        onChange={onChange}
                        placeholder="Select option"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                      <FormErrorMessage>
                        {errors.stage && errors.stage.message?.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                ></Controller>

                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={Boolean(errors.description)}>
                      <FormLabel>Description</FormLabel>

                      <Textarea
                        placeholder="Please enter description"
                        value={value}
                        onChange={onChange}
                      />

                      <FormErrorMessage>
                        {errors.description &&
                          errors.description.message?.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                ></Controller>

                <Controller
                  name="numberOfDoses"
                  control={control}
                  rules={{ required: "Number of doses is required" }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={Boolean(errors.numberOfDoses)}>
                      <FormLabel>Number of Doses</FormLabel>

                      <NumberInput value={value} onChange={onChange}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormErrorMessage>
                        {errors.numberOfDoses &&
                          errors.numberOfDoses.message?.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                ></Controller>

                <FormControl isInvalid={Boolean(errors.file)}>
                  <FormLabel>Vaccine Image</FormLabel>
                  <Input
                    type="file"
                    variant="flushed"
                    accept="image/png, image/jpeg"
                    {...register("file", {
                      required: "Vaccine image is required",
                    })}
                  />

                  <FormErrorMessage>
                    {errors.file && errors.file.message?.toString()}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <Checkbox name="isMandatory">Is mandatory</Checkbox>
                </FormControl>
              </Box>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" form="add-vaccine-form">
              Add
            </Button>
            <Button mr={3} onClick={props.onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddVaccineForm;
