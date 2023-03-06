export enum AccountStatus {
  NOT_VERIFY = 'not_verify',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AccountRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type AccountJWT = {
  id: number;
  username: string;
  email: string;
  role: AccountRole;
  status: AccountStatus;
  exp?: number;
  iat?: number;
};
