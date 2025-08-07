export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'waiter';
  username: string;
  password?: string;
}
