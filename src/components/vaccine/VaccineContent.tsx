import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaPen, FaEye, FaTrash } from "react-icons/fa";

import { Box, IconButton, useDisclosure, useToast } from "@chakra-ui/react";

import {
  selectVaccine,
  getVaccinesReducer,
  postVaccineReducer,
  deleteVaccineReducer,
  editVaccineReducer,
} from "../../features/vaccine/vaccineSlice";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import DataTable from "../commons/DataTable";
import FloatingButton from "../commons/FloatingButton";

import AddVaccineForm from "./AddVaccineForm";
import EditVaccineForm from "./EditVaccineForm";

import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

function VaccineContent() {
  const {
    isOpen: isAddVaccineOpen,
    onOpen: onOpenAddVaccine,
    onClose: onCloseAddVaccine,
  } = useDisclosure();

  const {
    isOpen: isDeleteVaccineOpen,
    onOpen: onOpenDeleteVaccine,
    onClose: onCloseDeleteVaccine,
  } = useDisclosure();

  const {
    isOpen: isEditVaccineOpen,
    onOpen: onOpenEditVaccine,
    onClose: onCloseEditVaccine,
  } = useDisclosure();

  const toast = useToast();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    vaccines,
    error,
    isAdded,
    isDeleted,
    selectedVaccine,
    isPerformingAction,
  } = useAppSelector((state) => state.vaccine);

  useEffect(() => {
    dispatch(getVaccinesReducer({}));
  }, []);

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

  const onAddVaccine = (data: FormData) => {
    dispatch(postVaccineReducer(data)).then(() => {
      onCloseAddVaccine();

      dispatch(getVaccinesReducer({}));
    });
  };

  const onDeleteVaccine = () => {
    dispatch(deleteVaccineReducer(selectedVaccine?.id));
  };

  const onEditVaccine = (id: number, data: FormData) => {
    dispatch(editVaccineReducer({ id, data })).then(() => {
      onCloseEditVaccine();

      dispatch(getVaccinesReducer({}));
    });
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

                    onOpenEditVaccine();
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

                    onOpenDeleteVaccine();
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

  return (
    <>
      {getVaccineContent()}

      <AddVaccineForm
        isOpen={isAddVaccineOpen}
        onClose={onCloseAddVaccine}
        onSubmit={onAddVaccine}
        isAdding={isPerformingAction}
      ></AddVaccineForm>

      <EditVaccineForm
        isOpen={isEditVaccineOpen}
        onSubmit={onEditVaccine}
        vaccine={selectedVaccine}
        onClose={onCloseEditVaccine}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteVaccineOpen}
        onClick={onDeleteVaccine}
        onClose={onCloseDeleteVaccine}
      />

      <FloatingButton onClick={onOpenAddVaccine} />
    </>
  );
}

export default VaccineContent;
