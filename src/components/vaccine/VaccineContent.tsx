import { Box, IconButton, useDisclosure, useToast } from "@chakra-ui/react";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectVaccine,
  getVaccinesReducer,
  postVaccineReducer,
  deleteVaccineReducer,
} from "../../features/vaccine/vaccineSlice";

import AddVaccineForm from "./AddVaccineForm";

import DataTable from "../commons/DataTable";
import FloatingButton from "../commons/FloatingButton";

import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";

function VaccineContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isDeleteVaccineOpen,
    onOpen: onOpenDeleteVaccine,
    onClose: onCloseDeleteVaccine,
  } = useDisclosure();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const {
    vaccines,
    isAdded,
    isDeleted,
    isPerformingAction,
    error,
    selectedVaccine,
  } = useAppSelector((state) => state.vaccine);

  const onEditClick = () => {};

  const onViewDetailClick = () => {};

  const onDeleteClick = () => {
    onOpenDeleteVaccine();
  };

  const onDeleteVaccine = () => {
    dispatch(deleteVaccineReducer(selectedVaccine?.id));
  };

  const getVaccineContent = () => {
    return vaccines?.length > 0 ? (
      <DataTable
        items={vaccines}
        columns={[
          {
            label: "Name",
            renderCell: (item: any) => item.name,
          },
          {
            label: "Number Of Doses",
            renderCell: (item: any) => item.numberOfDoses,
          },
          {
            label: "Stage",
            renderCell: (item: any) => item.stage,
          },
          {
            label: "Description",
            renderCell: (item: any) => item.description,
          },
          {
            label: "Options",
            renderCell: (item: any) => (
              <Box>
                <IconButton
                  aria-label="edit"
                  icon={<FaPen />}
                  size="xs"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => {
                    dispatch(selectVaccine(item));

                    onEditClick();
                  }}
                />

                <IconButton
                  aria-label="view detail"
                  icon={<FaEye />}
                  size="xs"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => {
                    navigate(`/vaccine/${item.id}`);
                  }}
                />

                <IconButton
                  aria-label="view detail"
                  icon={<FaTrash />}
                  size="xs"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => {
                    dispatch(selectVaccine(item));

                    onDeleteClick();
                  }}
                />
              </Box>
            ),
          },
        ]}
        numberOfItemsPerPage={10}
      ></DataTable>
    ) : (
      <h1>LOading</h1>
    );
  };

  useEffect(() => {
    if (isAdded) {
      toast({
        title: "Vaccine Successfully created",
        status: "success",
        isClosable: true,
      });
    }

    if (isDeleted) {
      onCloseDeleteVaccine();

      toast({
        title: "Vaccine Successfully deleted",
        status: "success",
        isClosable: true,
      });

      dispatch(getVaccinesReducer({}));
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

    dispatch(postVaccineReducer(formData)).then(() =>
      dispatch(getVaccinesReducer({}))
    );
  };

  useEffect(() => {
    dispatch(getVaccinesReducer({}));
  }, []);

  return (
    <>
      {getVaccineContent()}

      <DeleteConfirmationDialog
        isOpen={isDeleteVaccineOpen}
        onClick={onDeleteVaccine}
        onClose={onCloseDeleteVaccine}
      />

      <AddVaccineForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        isAdding={isPerformingAction}
      ></AddVaccineForm>

      <FloatingButton onClick={onOpen} />
    </>
  );
}

export default VaccineContent;
