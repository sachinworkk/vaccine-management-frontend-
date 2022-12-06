export interface VaccinePayload {
  id?: number;
  file: any;
  name: string;
  stage: string;
  description: string;
  isMandatory: boolean;
  numberOfDoses: number;
  vaccineImageUrl?: string;
}
