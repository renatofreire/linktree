export type PublicUserInfo = {
  email: string;
  userName: string;
  name: string;
  bio?: string | null;
};

export type AuthUserInfo = PublicUserInfo & {
  password: string;
};

export type User = AuthUserInfo & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Credentials = {
  email: string;
  password: string;
};
