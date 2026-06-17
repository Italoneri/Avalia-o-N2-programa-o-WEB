import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Painel from "./pages/Painel";
import RelatorioPetDono from "./pages/RelatorioPetDono";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login"    element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rota protegida — redireciona para /login se não autenticado */}
          <Route
            path="/painel"
            element={
              <PrivateRoute>
                <Painel />
              </PrivateRoute>
            }
          />

          <Route
            path="/relatorio"
            element={
               <PrivateRoute>
                  <RelatorioPetDono />
              </PrivateRoute>
           }
         />

          {/* Qualquer outra rota vai para o painel (PrivateRoute trata o login) */}
          <Route path="*" element={<Navigate to="/painel" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
