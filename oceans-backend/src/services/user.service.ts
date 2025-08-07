import { User } from '../models/user.model';
import {
  createUserRepository,
  getUserRepository,
  getUsersRepository,
} from '../repository/user.repository';

export const createUser = async (user: User) => {
  await createUserRepository(user);
};

export const getUser = async (email: string) => {
  return await getUserRepository(email);
};

export const getUsers = async () => {
  return await getUsersRepository();
};
