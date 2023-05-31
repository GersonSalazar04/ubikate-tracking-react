import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ColaboradorPage from './Pages/Colaborador/ColaboradorPage';
import ColaboradorInfo from './Pages/Colaborador/ColaboradorInfo';
import Layout from './Components/Layout';
import Login from './Components/Login';
import MapaPage from './Pages/Marca/MapaPage';
import ColaboradorNew from './Pages/Colaborador/ColaboradorNew';

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica para el inicio de sesión exitoso
    window.location.href = `/dashboard`;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route exact path="/colaborador" element={<ColaboradorPage/>} />
                <Route exact path="/colaborador/:id/edit" element={<ColaboradorInfo/>} />
                <Route path="/dashboard" element={<ColaboradorPage/>} />
                <Route exact path="/marcas" element={<MapaPage/>} />
                <Route path="/marcas" element={<MapaPage />} />
                <Route exact path="/colaborador/new" element={<ColaboradorNew/>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );

};

export default AppRouter;
