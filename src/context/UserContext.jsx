/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // تحديث معلومات المستخدم
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser))
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};
export default UserProvider;
