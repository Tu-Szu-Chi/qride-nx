export enum BoRole {
  ADMIN = 'admin',
  AGENT = 'agent',
}

export interface BoUser {
  id: string;
  username: string;
  role: BoRole;
  password: string;
}

export interface BoLoginDto {
  username: string;
  password: string;
}

export interface BoAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<BoUser, 'password'>;
}

export interface CreateBoUserDto {
  username: string;
  password: string;
  role: BoRole;
}
