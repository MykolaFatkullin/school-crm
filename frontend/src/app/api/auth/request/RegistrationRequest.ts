import { Gender } from '../../../../entities/user/model/Gender.enum';

export interface RegistrationRequest {
  schoolName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
  timezone: string;
}
