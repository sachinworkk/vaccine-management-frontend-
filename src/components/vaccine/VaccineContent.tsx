import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaPen, FaEye, FaTrash } from "react-icons/fa";

import {
  Box,
  Center,
  Spinner,
  useToast,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  getVaccines,
  postVaccine,
  editVaccine,
  selectVaccine,
  deleteVaccine,
} from "../../features/vaccine/vaccineSlice";

import { ReactComponent as AddVaccineImg } from "../../assets/images/AddVaccine.svg";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import DataTable from "../commons/DataTable";
import FloatingButton from "../commons/FloatingButton";
import DeleteConfirmationDialog from "../commons/DeleteConfirmationDIalog";

import AddVaccineForm from "./AddVaccineForm";
import EditVaccineForm from "./EditVaccineForm";

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
    error,
    isAdded,
    isEdited,
    isLoading,
    vaccines,
    isDeleted,
    selectedVaccine,
    isPerformingAction,
  } = useAppSelector((state) => state.vaccine);

  useEffect(() => {
    dispatch(getVaccines({}));
  }, [dispatch]);

  useEffect(() => {
    if (isAdded) {
      toast({
        title: "Vaccine Successfully created",
        status: "success",
        isClosable: true,
      });
    }

    if (isEdited) {
      toast({
        title: "Vaccine Successfully edited",
        status: "success",
        isClosable: true,
      });
    }

    if (isDeleted) {
      toast({
        title: "Vaccine Successfully deleted",
        status: "success",
        isClosable: true,
      });
    }

    if (error) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
    }
  }, [
    toast,
    error,
    isAdded,
    dispatch,
    isEdited,
    isDeleted,
    isPerformingAction,
  ]);

  const onAddVaccine = (data: FormData) => {
    dispatch(postVaccine(data)).then(() => {
      onCloseAddVaccine();

      dispatch(getVaccines({}));
    });
  };

  const onDeleteVaccine = () => {
    dispatch(deleteVaccine(selectedVaccine?.id)).then(() => {
      onCloseDeleteVaccine();

      dispatch(getVaccines({}));
    });
  };

  const onEditVaccine = (data: FormData, id: number | undefined) => {
    dispatch(editVaccine({ id, data })).then(() => {
      onCloseEditVaccine();

      dispatch(getVaccines({}));
    });
  };

  const getVaccineContent = () => {
    if (isLoading) {
      return (
        <Center h="60vh">
          <Spinner />
        </Center>
      );
    }

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
      <Center h="60vh">
        <AddVaccineImg />
      </Center>
    );
  };

  return (
    <>
      {getVaccineContent()}

      <AddVaccineForm
        onSubmit={onAddVaccine}
        isOpen={isAddVaccineOpen}
        onClose={onCloseAddVaccine}
        isAdding={isPerformingAction}
      ></AddVaccineForm>

      <EditVaccineForm
        onSubmit={onEditVaccine}
        vaccine={selectedVaccine}
        isOpen={isEditVaccineOpen}
        onClose={onCloseEditVaccine}
        isEditing={isPerformingAction}
      />

      <DeleteConfirmationDialog
        dialogHeader="Delete Vaccine"
        onClick={onDeleteVaccine}
        isOpen={isDeleteVaccineOpen}
        onClose={onCloseDeleteVaccine}
        isDeleting={isPerformingAction}
        dialogSubheader="Are you sure? You want to delete the vaccine?"
      />

      <FloatingButton onClick={onOpenAddVaccine} />
    </>
  );
}

export default VaccineContent;
