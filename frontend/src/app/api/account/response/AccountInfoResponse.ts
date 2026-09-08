import { UserRoles } from '../../../../entities/user/model';

export type AccountInfoResponse = {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
};
