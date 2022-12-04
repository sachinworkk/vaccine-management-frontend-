import FloatingButton from "../commons/FloatingButton";

import { useDisclosure } from "@chakra-ui/react";

import AddVaccineForm from "./AddVaccineForm";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { getVaccines, postVaccine } from "../../features/vaccine/vaccineSlice";

function VaccineContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const { vaccines } = useAppSelector((state) => state.vaccine);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("file", data.file);
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
      ></AddVaccineForm>

      {vaccines.map((vaccine) => (
        <h1>{vaccine}</h1>
      ))}
      <FloatingButton onClick={onOpen} />
    </>
  );
}

export default VaccineContent;
