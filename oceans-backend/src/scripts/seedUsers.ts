import { db } from '../config/firebase';
import bcrypt from 'bcrypt';

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await db.collection('users').add({
    username: 'ADMINISTRADOR',
    email: 'admin@oceans.com',
    password: hashedPassword,
    role: 'admin',
  });

  await db.collection('users').add({
    username: 'MESERO',
    email: 'waiter@oceans.com',
    password: await bcrypt.hash('waiter123', 10),
    role: 'waiter',
  });

  console.log('✅ Users created successfully');
  process.exit(0);
};

seedUsers().catch(error => {
  console.error(error);
  process.exit(1);
});
