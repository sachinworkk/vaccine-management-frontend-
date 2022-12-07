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
import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import FormData from "form-data";

import { VaccinePayload } from "../../types/vaccinePayload";
import { editVaccineForm } from "../../types/props";

function EditVaccineForm(props: editVaccineForm) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    reset({ ...props.vaccine });
  }, [props.vaccine]);

  const handleAddVaccine = (data: VaccinePayload) => {
    const formData = new FormData();

    if (data?.file[0]?.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      formData.append("vaccineImage", data.file[0]);
    } else {
      formData.append("vaccineImageUrl", data.vaccineImageUrl);
    }

    formData.append("name", data.name);

    formData.append("stage", data.stage);
    formData.append("description", data.description);
    formData.append(
      "isMandatory",
      data?.isMandatory ? data.isMandatory : false
    );
    formData.append("numberOfDoses", data.numberOfDoses);

    props.onSubmit(formData, data.id);
  };

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
              onSubmit={handleSubmit((data) =>
                handleAddVaccine(data as VaccinePayload)
              )}
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
                        onChange={onChange}
                        value={value}
                        placeholder="Select option"
                      >
                        <option value="Exploratory">Exploratory</option>
                        <option value="Preclinical">Preclinical</option>
                        <option value="Clinical development">
                          Clinical development
                        </option>
                        <option value="Approval">Approval</option>
                        <option value="Pharmacovigilance">
                          Pharmacovigilance
                        </option>
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
                        onChange={onChange}
                        value={value}
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

                <FormControl>
                  <FormLabel>Vaccine Image</FormLabel>
                  <Input
                    type="file"
                    variant="flushed"
                    accept="image/png, image/jpeg"
                    {...register("file")}
                  />

                  <FormErrorMessage>
                    {errors.file && errors.file.message?.toString()}
                  </FormErrorMessage>
                </FormControl>

                <Controller
                  name="isMandatory"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <Checkbox onChange={onChange} isChecked={value}>
                        Is mandatory
                      </Checkbox>
                    </FormControl>
                  )}
                ></Controller>
              </Box>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              form="add-vaccine-form"
              isLoading={props.isEditing}
            >
              Edit
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

export default EditVaccineForm;
