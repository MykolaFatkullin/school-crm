import { RegisterForm } from '../../../pages/registrationPage/model';
import { RegistrationRequest } from './request';
import { Gender } from '../../../entities/user/model/Gender.enum';

export const mapRegisterFormToRequest = (
  form: RegisterForm,
  timezone: string,
): RegistrationRequest => ({
  schoolName: form.schoolName,
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  password: form.password,
  gender: Gender[form.gender as keyof typeof Gender],
  timezone: timezone,
});
