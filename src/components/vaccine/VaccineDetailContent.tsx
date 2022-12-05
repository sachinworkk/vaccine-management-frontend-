import {
  Box,
  FormLabel,
  Input,
  Textarea,
  FormControl,
  Checkbox,
  Select,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getVaccineByIdReducer } from "../../features/vaccine/vaccineSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

function VaccineDetailContent() {
  const { id } = useParams();

  const { selectedVaccine } = useAppSelector((state) => state.vaccine);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVaccineByIdReducer(parseInt(id as string, 10)));
  }, []);

  return (
    <>
      <Box p={4} display="flex" flexDirection="column" gap="16px" bg="white">
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input value={selectedVaccine?.name || ""} isReadOnly />
        </FormControl>

        <FormControl>
          <FormLabel>Stage</FormLabel>
          <Select
            isReadOnly
            value={selectedVaccine?.stage || ""}
            placeholder="Select option"
          >
            <option value="Exploratory">Exploratory</option>
            <option value="Preclinical">Preclinical</option>
            <option value="Clinical development">Clinical development</option>
            <option value="Approval">Approval</option>
            <option value="Pharmacovigilance">Pharmacovigilance</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Please enter description"
            value={selectedVaccine?.description || ""}
            isReadOnly
          />
        </FormControl>

        <FormControl>
          <FormLabel>Number Of Doses</FormLabel>
          <Input
            type="number"
            value={selectedVaccine?.numberOfDoses || ""}
            isReadOnly
          />
        </FormControl>

        <FormControl>
          <Checkbox isChecked={selectedVaccine?.isMandatory}>
            Is mandatory
          </Checkbox>
        </FormControl>

        <Box boxSize="m">
          <FormLabel>Vaccine Image</FormLabel>
          <Image
            src={selectedVaccine?.vaccineImageUrl || ""}
            alt="Vaccine Image"
            fallbackSrc="https://via.placeholder.com/400?text=Image+Not+Available"
          />
        </Box>
      </Box>
    </>
  );
}

export default VaccineDetailContent;
