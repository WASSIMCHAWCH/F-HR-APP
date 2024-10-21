import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// Create a provider component
const ProtectedRoute = ({ roles, children }) => { 
    const [user, setUser] = useState({
        isAuthenticated: false,
        role: "", 
    });
    const [loading, setLoading] = useState(true); // Add a loading state


    useEffect(() => {
        // Fetch user role from token
        const getUserRole = async () => {
            try {
                const res = await axios.get("http://localhost:5000/get-role", { withCredentials: true });

                if(res.data.Status){
                    setUser({
                        role: res.data.role, 
                        isAuthenticated: true
                    });
                }
                
            } catch (err) {
                console.error("Error fetching user role", err);
                setUser({
                    role: "", 
                    isAuthenticated: false, // If there's an error, mark as not authenticated
                });
            } finally {
                setLoading(false); // Set loading to false after fetch attempt
            }
        };
        getUserRole();
    }, []); 

    // Wait until user data is fetched before deciding to redirect or not
    if (loading) {
        return <h2>Loading...</h2>; // Display a loading message while fetching
    }

    if (!user.isAuthenticated) {
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    // Ensure user.roles is always an array and doesn't contain undefined values
    const hasRequiredRole = roles.includes(user.role); // Convert role to uppercase to match

    if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" />; // Redirect if the user does not have the required role
    }

    // If the user has the required role, render the children component
    return children;
};

export default ProtectedRoute;