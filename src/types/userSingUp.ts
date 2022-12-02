export interface UserSignUp {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: string;
  password: string;
  dateOfBirth: string;
  confirmPassword?: string;
}
