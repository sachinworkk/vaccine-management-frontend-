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
  resetSelectedVaccine,
} from "../../features/vaccine/vaccineSlice";

import { ReactComponent as AddVaccineImg } from "../../assets/images/AddVaccine.svg";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { AppError } from "../../types/appError";
import { VaccinePayload } from "../../types/vaccinePayload";

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

  const { isLoading, vaccines, selectedVaccine, isPerformingAction } =
    useAppSelector((state) => state.vaccine);

  useEffect(() => {
    dispatch(getVaccines({}));
  }, [dispatch]);

  const openAddVaccine = () => {
    dispatch(resetSelectedVaccine());

    onOpenAddVaccine();
  };

  const openEditVaccine = (item: VaccinePayload) => {
    dispatch(selectVaccine(item));

    onOpenEditVaccine();
  };

  const openDeleteVaccine = (item: VaccinePayload) => {
    dispatch(selectVaccine(item));

    onOpenDeleteVaccine();
  };

  const onAddVaccine = async (data: FormData) => {
    try {
      await dispatch(postVaccine(data));

      onCloseAddVaccine();

      toast({
        title: "Vaccine Successfully created",
        status: "success",
        isClosable: true,
      });

      dispatch(resetSelectedVaccine());

      await dispatch(getVaccines({}));
    } catch (error) {
      toast({
        title: (error as AppError).data?.details,
        status: "error",
        isClosable: true,
      });
    }
  };

  const onDeleteVaccine = async () => {
    try {
      await dispatch(deleteVaccine(selectedVaccine?.id));

      onCloseDeleteVaccine();

      toast({
        title: "Vaccine Successfully deleted",
        status: "success",
        isClosable: true,
      });

      dispatch(resetSelectedVaccine());

      await dispatch(getVaccines({}));
    } catch (error) {
      toast({
        title: (error as AppError).data?.details,
        status: "error",
        isClosable: true,
      });
    }
  };

  const onEditVaccine = async (data: FormData, id: number | undefined) => {
    try {
      await dispatch(editVaccine({ id, data }));

      onCloseEditVaccine();

      toast({
        title: "Vaccine Successfully edited",
        status: "success",
        isClosable: true,
      });

      dispatch(resetSelectedVaccine());

      await dispatch(getVaccines({}));
    } catch (error) {
      toast({
        title: (error as AppError).data?.details,
        status: "error",
        isClosable: true,
      });
    }
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
            renderCell: (item: VaccinePayload) => item.name,
          },
          {
            label: "Number Of Doses",
            renderCell: (item: VaccinePayload) => item.numberOfDoses,
          },
          {
            label: "Stage",
            renderCell: (item: VaccinePayload) => item.stage,
          },
          {
            label: "Description",
            renderCell: (item: VaccinePayload) => item.description,
          },
          {
            label: "Options",
            renderCell: (item: VaccinePayload) => (
              <Box>
                <IconButton
                  aria-label="edit"
                  icon={<FaPen />}
                  size="xs"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => {
                    openEditVaccine(item);
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
                    openDeleteVaccine(item);
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
        vaccine={selectedVaccine}
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

      <FloatingButton onClick={openAddVaccine} />
    </>
  );
}

export default VaccineContent;
