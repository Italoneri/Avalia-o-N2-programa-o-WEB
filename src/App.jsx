import ListarAnimais from "./pages/Animais/ListarAnimais";
import FormAnimal from "./pages/Animais/FormAnimal";
// Importações das novas páginas de Produtos
import ListarProdutos from "./pages/Produtos/ListarProdutos";
import FormProduto from "./pages/Produtos/FormProduto";

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
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rota protegida do Painel */}
          <Route
            path="/painel"
            element={
              <PrivateRoute>
                <Painel />
              </PrivateRoute>
            }
          />

          {/* Rotas protegidas dos Animais (CRUD 1) */}
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

          {/* Rotas protegidas dos Produtos (CRUD 2) */}
          <Route
            path="/produtos"
            element={<PrivateRoute><ListarProdutos /></PrivateRoute>}
          />
          <Route
            path="/produtos/novo"
            element={<PrivateRoute><FormProduto /></PrivateRoute>}
          />
          <Route
            path="/produtos/editar/:id"
            element={<PrivateRoute><FormProduto /></PrivateRoute>}
          />

          {/* Qualquer outra rota vai para o painel (PrivateRoute trata o login) */}
          <Route path="*" element={<Navigate to="/painel" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}