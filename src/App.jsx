import ListarAnimais from "./pages/Animais/ListarAnimais";
import FormAnimal from "./pages/Animais/FormAnimal";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Painel from "./pages/Painel";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/painel"
            element={
              <PrivateRoute>
                <Painel />
              </PrivateRoute>
            }
          />

          <Route
            path="/animais"
            element={<PrivateRoute><ListarAnimais /></PrivateRoute>}
          />
          <Route
            path="/animais/novo"
            element={<PrivateRoute><FormAnimal /></PrivateRoute>}
          />
          <Route
            path="/animais/editar/:id"
            element={<PrivateRoute><FormAnimal /></PrivateRoute>}
          />

          <Route path="*" element={<Navigate to="/painel" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}