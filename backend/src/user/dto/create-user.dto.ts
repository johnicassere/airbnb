export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  phone: number;
  birthdate: string;
  password: string;
  passwordConfirm: string;
}
