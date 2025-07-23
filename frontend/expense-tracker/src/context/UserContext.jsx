import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const updateUser = (userData) => {
        // Ensure hasPaid is always present
        setUser({
            ...userData,
            hasPaid: userData.hasPaid !== undefined ? userData.hasPaid : false,
        });
    };
    const clearUser = () => {
        setUser(null);
    };
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;