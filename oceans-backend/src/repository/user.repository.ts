import { db } from '../config/firebase';
import { User } from 'src/models/user.model';
import bcrypt from 'bcrypt';

export const getUserRepository = async (email: string): Promise<User> => {
  const userSnapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  const user = userSnapshot.docs.map(doc => doc.data() as User)[0];
  return user;
};

export const createUserRepository = async (user: User) => {
  await db.collection('users').add({
    username: user.username,
    email: user.email,
    password: await bcrypt.hash(user.password as string, 10),
    role: user.role,
  });
};

export const getUsersRepository = async (): Promise<User[]> => {
  const usersSnapshot = await db.collection('users').get();
  const users = usersSnapshot.docs.map(doc => doc.data() as User);
  return users;
};
