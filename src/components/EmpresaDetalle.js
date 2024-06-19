import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const EmpresaDetalle = () => {
  const { id } = useParams();
  const { sales } = useSelector((state) => state.sales);

  const companySales = sales.filter((sale) => sale.nameAgency === id);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Container>
        <Card sx={{ padding: 2, marginBottom: 2, width: '80%', marginTop: 2 }}>
          <Typography variant="h5" align="center">
            <Link to={`/Empresas`}>{"Empresa"}</Link>
            {" > "}
            {id}
          </Typography>
        </Card>
        <TableContainer component={Paper} sx={{ width: '83%', marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="sales details table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre Cliente</TableCell>
                <TableCell align="right">Personas</TableCell>
                <TableCell align="right">Día</TableCell>
                <TableCell align="right">Hora</TableCell>
                <TableCell align="right">Valor Venta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companySales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell component="th" scope="row">{sale.name}</TableCell>
                  <TableCell align="right">{sale.persons}</TableCell>
                  <TableCell align="right">{sale.day}</TableCell>
                  <TableCell align="right">{sale.hour}</TableCell>
                  <TableCell align="right">{sale.finalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default EmpresaDetalle;
