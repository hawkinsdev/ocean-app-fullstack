export type TLoginForm = {
  email: string;
  password: string;
};

export type TAuthData = {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
};
