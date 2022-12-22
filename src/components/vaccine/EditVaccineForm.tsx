import {
  Box,
  Image,
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

import { joiResolver } from "@hookform/resolvers/joi";

import { getFormData } from "../../utils/formData";

import { editVaccineForm } from "../../types/props";
import { VaccinePayload } from "../../types/vaccinePayload";

import { vaccineSchema } from "../../schemas/vaccineSchema";
import { NUMBER_OF_DOSES } from "../../constants/constants";

function EditVaccineForm(props: editVaccineForm) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: joiResolver(vaccineSchema) });

  useEffect(() => {
    reset({ ...props.vaccine });
  }, [props.vaccine]);

  const handleAddVaccine = (data: VaccinePayload) => {
    props.onSubmit(getFormData(data), data.id);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Edit Vaccine</ModalHeader>
          <Divider />

          <ModalBody>
            <form
              id="edit-vaccine-form"
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
                    {...register("name")}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message?.toString()}
                  </FormErrorMessage>
                </FormControl>

                <Controller
                  name="numberOfDoses"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={Boolean(errors.numberOfDoses)}>
                      <FormLabel>Number of Doses</FormLabel>

                      <NumberInput
                        value={value}
                        onChange={onChange}
                        min={NUMBER_OF_DOSES.MIN_NUMBER}
                        max={NUMBER_OF_DOSES.MAX_NUMBER}
                        clampValueOnBlur={false}
                      >
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

                <Controller
                  name="stage"
                  control={control}
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

                <FormControl>
                  <FormLabel> Current Vaccine Image</FormLabel>
                  <Controller
                    name="vaccineImageUrl"
                    control={control}
                    render={({ field: { value } }) => (
                      <Image
                        src={value}
                        mb="4"
                        boxSize="100"
                        alt="Vaccine Image"
                        fallbackSrc="https://via.placeholder.com/400?text=Image+Not+Available"
                      />
                    )}
                  ></Controller>

                  <FormLabel>Upload Vaccine Image</FormLabel>
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
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={Boolean(errors.description)}>
                      <FormLabel>Description</FormLabel>

                      <Textarea
                        rows={6}
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
              </Box>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              form="edit-vaccine-form"
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
