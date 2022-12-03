import FloatingButton from "../commons/FloatingButton";

import { useDisclosure } from "@chakra-ui/react";

import AddVaccineForm from "./AddVaccineForm";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { getVaccines } from "../../features/vaccine/vaccineSlice";

function VaccineContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const { vaccines } = useAppSelector((state) => state.vaccine);

  useEffect(() => {
    dispatch(getVaccines({}));
  }, []);
  return (
    <>
      <AddVaccineForm isOpen={isOpen} onClose={onClose}></AddVaccineForm>
      <FloatingButton onClick={onOpen} />
    </>
  );
}

export default VaccineContent;
