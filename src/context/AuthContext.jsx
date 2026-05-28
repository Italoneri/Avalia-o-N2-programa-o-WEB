import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const KEY_SESSION = "petco_session";
const KEY_USERS   = "petco_users";


function initUsers() {
  if (!localStorage.getItem(KEY_USERS)) {
    localStorage.setItem(KEY_USERS, JSON.stringify([
      { name: "Administrador", email: "admin@petco.com", password: "123456" },
    ]));
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initUsers();
    const stored = localStorage.getItem(KEY_SESSION);
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (found) {
      const userData = { name: found.name, email: found.email };
      setUser(userData);
      localStorage.setItem(KEY_SESSION, JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: "E-mail ou senha incorretos." };
  }

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
    const emailJaUsado = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailJaUsado) {
      return { success: false, message: "Este e-mail já está cadastrado." };
    }
    const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
    localStorage.setItem(KEY_USERS, JSON.stringify([...users, newUser]));
    const userData = { name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem(KEY_SESSION, JSON.stringify(userData));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(KEY_SESSION);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
