'use client'
import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
}

const Userspage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const usersData: User[] = await res.json();
                setUsers(usersData);
            } catch (error) {
                setError(error);
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Userspage;
