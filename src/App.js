import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store from './store.js';
import Empresas from './components/Empresas.js'; 
import EmpresaDetalle from './components/EmpresaDetalle.js';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Matias Marcelo Quiero Arevalo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Router>
          <Routes>
            <Route path="/" exact element={<Navigate to="/empresas" />} />
            <Route path="/empresas" exact element={<Empresas />} />
            <Route path="/empresas/:id" element={<EmpresaDetalle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </Provider>
  );
}

function NotFound() {
  return <h2>404 - Page not found</h2>;
}

export default App;
