export type TLoginForm = {
  email: string;
  password: string;
};

export type TUser = {
  id: string;
  username: string;
  email: string;
  role: "admin" | "waiter";
};

export type TAuthData = {
  token: string;
  user: TUser;
};
