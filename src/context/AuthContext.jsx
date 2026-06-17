import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import cookieService from "../services/cookieService";

const AuthContext = createContext(null);

const KEY_SESSION = "petco_session";

export function AuthProvider({ children }) {
  const [user, setUser]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = cookieService.get(KEY_SESSION);
    if (stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  async function login(email, senha) {
    try {
      const { data: users, error } = await supabase
          .from("usuarios")
          .select("id, nome, email, senha,tipo")
          .eq("email", email.trim().toLowerCase())
          .limit(1);

      if (error) throw error;

      if (!users || users.length === 0) {
        return { success: false, message: "E-mail ou senha incorretos." };
      }

      const found = users[0];

      if (found.senha === senha) {
        const userData = { id: found.id, nome: found.nome, email: found.email, tipo: found.tipo };

        setUser(userData);
        cookieService.set(KEY_SESSION, userData);

        return { success: true };
      }

      return { success: false, message: "E-mail ou senha incorretos." };
    } catch (err) {
      console.error("Erro no login:", err);
      return { success: false, message: "Erro ao conectar com o banco de dados." };
    }
  }

  async function register(name, email, password) {
    try {
      const { data: existingUsers } = await supabase
          .from("usuarios")
          .select("email")
          .eq("email", email.trim().toLowerCase());

      if (existingUsers && existingUsers.length > 0) {
        return { success: false, message: "Este e-mail já está cadastrado." };
      }

      const { data: insertedData, error } = await supabase
          .from("usuarios")
          .insert([
            {
              nome: name.trim(),
              email: email.trim().toLowerCase(),
              senha: password,
              tipo: "user"
            }
          ])
          .select();

      if (error) throw error;

      const newUser = insertedData[0];

      const userData = { id: newUser.id, nome: newUser.nome, email: newUser.email, tipo: newUser.tipo };

      setUser(userData);
      cookieService.set(KEY_SESSION, userData);

      return { success: true };
    } catch (err) {
      console.error("Erro no registro:", err);
      return { success: false, message: "Erro ao salvar o usuário no banco." };
    }
  }

  function logout() {
    setUser(null);
    cookieService.remove(KEY_SESSION);
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
