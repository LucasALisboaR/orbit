import { User } from '../../src/app/models/user/user.model';

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInMs: number;
  user: User;
}
