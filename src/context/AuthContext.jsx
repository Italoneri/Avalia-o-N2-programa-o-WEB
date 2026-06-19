import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import cookieService from "../services/cookieService";

const AuthContext = createContext(null);

const KEY_SESSION = "petco_session";

async function syncGoogleUser(session) {
  const { user: authUser } = session;
  const email = authUser.email.trim().toLowerCase();
  const nome = authUser.user_metadata?.full_name || authUser.user_metadata?.name || email;

  const { data: existing } = await supabase
    .from("usuarios")
    .select("id, nome, email, tipo")
    .eq("email", email)
    .limit(1);

  if (existing && existing.length > 0) {
    return existing[0];
  }

  const { data: inserted, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, senha: null, tipo: "cliente" }])
    .select();

  if (error) throw error;
  return inserted[0];
}

export function AuthProvider({ children }) {
  const [user, setUser]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = cookieService.get(KEY_SESSION);
    if (stored) {
      setUser(stored);
      setLoading(false);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        const stored = cookieService.get(KEY_SESSION);
        if (stored) {
          setUser(stored);
          setLoading(false);
          return;
        }

        const authUser = session.user;
        const fallback = {
          id: authUser.id,
          nome: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email,
          email: authUser.email,
          tipo: "cliente",
        };

        try {
          const dbUser = await syncGoogleUser(session);
          const userData = { id: dbUser.id, nome: dbUser.nome, email: dbUser.email, tipo: dbUser.tipo };
          setUser(userData);
          cookieService.set(KEY_SESSION, userData);
        } catch (err) {
          console.error("Erro ao sincronizar usuário Google, usando dados da sessão:", err);
          setUser(fallback);
          cookieService.set(KEY_SESSION, fallback);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Função de login: busca o usuário no banco pelo email e compara a senha

  async function login(email, senha) {
    try {
      const { data: users, error } = await supabase
          .from("usuarios")
          .select("id, nome, email, senha,tipo")
          .eq("email", email.trim().toLowerCase())
          .limit(1);

      if (error) throw error;

      // Nenhum usuário encontrado com esse email
      if (!users || users.length === 0) {
        return { success: false, message: "E-mail ou senha incorretos." };
      }

      const found = users[0];

      // Compara a senha digitada com a do banco

      if (found.senha === senha) {
        const userData = { id: found.id, nome: found.nome, email: found.email, tipo: found.tipo };

        // Salva o usuário no estado e no cookie (validade 7 dias)

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

  // Função de cadastro: verifica se email já existe e insere novo usuário

  async function register(name, email, password) {
    try {
      // Verifica se o email já está cadastrado
      const { data: existingUsers } = await supabase
          .from("usuarios")
          .select("email")
          .eq("email", email.trim().toLowerCase());

      if (existingUsers && existingUsers.length > 0) {
        return { success: false, message: "Este e-mail já está cadastrado." };
      }

      // Insere o novo usuário com tipo "cliente" (cliente padrão)

      const { data: insertedData, error } = await supabase
          .from("usuarios")
          .insert([
            {
              nome: name.trim(),
              email: email.trim().toLowerCase(),
              senha: password,
              tipo: "cliente"
            }
          ])
          .select();

      if (error) throw error;

      const newUser = insertedData[0];

      // Autentica automaticamente após o cadastro

      const userData = { id: newUser.id, nome: newUser.nome, email: newUser.email, tipo: newUser.tipo };

      setUser(userData);
      cookieService.set(KEY_SESSION, userData);

      return { success: true };
    } catch (err) {
      console.error("Erro no registro:", err);
      return { success: false, message: "Erro ao salvar o usuário no banco." };
    }
  }

  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("Erro no login com Google:", error);
      return { success: false, message: error.message };
    }
    return { success: true };
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    cookieService.remove(KEY_SESSION);
  }

  return (
      <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, loading }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
