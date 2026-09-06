import { UUID } from 'node:crypto';
import { UserRoles } from '../../../../entities/user/model';

export type AccountInfoResponse = {
  id: UUID;
  schoolId: UUID;
  firstName: string;
  lastName: string;
  role: UserRoles;
};
