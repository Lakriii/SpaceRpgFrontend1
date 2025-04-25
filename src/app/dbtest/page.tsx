'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, addUser } from '../actions/users';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [userList, setUserList] = useState<User[]>([]);

  // Funkcia na získanie všetkých používateľov
  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUserList(users);
  };

  // Spustí sa pri prvom načítaní stránky
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funkcia na spracovanie formuláru
  async function handleSubmit(formData: FormData) {
   
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    await addUser(name, email);
    fetchUsers(); // Obnovíme zoznam používateľov po pridaní nového
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <form action={handleSubmit} className="mb-6 space-y-2">
        <input
          name="name"
          placeholder="Name"
          required
          className="border p-2 w-full"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Add User
        </button>
      </form>

      <ul className="space-y-2">
        {userList.map((user) => (
          <li key={user.id} className="border p-2 rounded">
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
