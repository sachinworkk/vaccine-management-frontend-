export interface addVaccineForm {
  isOpen: boolean;
  onClose: () => void;
  isAdding: boolean;
  onSubmit: (data: any) => void;
}

export interface editVaccineForm {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  vaccine: object;
  onSubmit: (data: any, id?: number) => void;
}

export interface deleteConfirmationDialog {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  isDeleting?: boolean;
  dialogHeader: string;
  dialogSubheader: string;
}
