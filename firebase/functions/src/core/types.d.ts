import { UserType } from '../../../../types/UserType';

declare global {
  namespace Express {
    export interface Request {
      user: UserType | null;
    }
  }
}
