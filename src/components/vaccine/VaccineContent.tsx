import FloatingButton from "../commons/FloatingButton";

import { useDisclosure, useToast } from "@chakra-ui/react";

import AddVaccineForm from "./AddVaccineForm";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { getVaccines, postVaccine } from "../../features/vaccine/vaccineSlice";
import VaccineCard from "./VaccineCard";

function VaccineContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const toast = useToast();

  const { vaccines, isAdded, isPerformingAction, error } = useAppSelector(
    (state) => state.vaccine
  );

  useEffect(() => {
    if (isAdded) {
      toast({
        title: "Vaccine Successfully created",
        status: "success",
        isClosable: true,
      });
    }
  }, [isAdded, isPerformingAction, error]);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("vaccineImage", data.file[0]);
    formData.append("stage", data.stage);
    formData.append("description", data.description);
    formData.append(
      "isMandatory",
      data?.isMandatory ? data.isMandatory : false
    );
    formData.append("numberOfDoses", data.numberOfDoses);

    dispatch(postVaccine(formData));
  };

  useEffect(() => {
    dispatch(getVaccines({}));
  }, []);
  return (
    <>
      <AddVaccineForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        isAdding={isPerformingAction}
      ></AddVaccineForm>

      {vaccines.map((vaccine: any) => (
        <VaccineCard vaccine={vaccine}></VaccineCard>
      ))}
      <FloatingButton onClick={onOpen} />
    </>
  );
}

export default VaccineContent;
