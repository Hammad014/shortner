// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

interface User {
  token: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    // const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            // If no token is found, redirect to the login page
            redirect('/login');
        } 
        //else {
        //     // Set the user state with the token
        //     redirect('/Shorten');
        // }
    }, );

    // if (!user) {
    //     // Display a loading indicator or similar while checking for user token
    //     // return <div>Loading...</div>;
    //     redirect('/login');
    // }

    // Render children if the user token exists
    return <>{children}</>;
};

export default ProtectedRoute;
