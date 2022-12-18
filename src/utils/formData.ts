import { VaccinePayload } from "./../types/vaccinePayload";

export const getFormData = (data: VaccinePayload) => {
  const formData = new FormData();

  formData.append("name", data?.name);

  if (data?.file[0]?.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    formData.append("vaccineImage", data?.file[0]);
  } else {
    formData.append("vaccineImageUrl", data?.vaccineImageUrl as string);
  }

  formData.append("stage", data?.stage);
  formData.append("description", data?.description);
  formData.append("isMandatory", Boolean(data?.isMandatory).toString());
  formData.append("numberOfDoses", data?.numberOfDoses?.toString());

  return formData;
};
