export interface User {
  id: string;
  email: string;
  role: 'admin' | 'waiter';
  username: string;
  password?: string;
}
