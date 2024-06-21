import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSales } from '../actions/salesActions.js'; 
import { Link } from 'react-router-dom';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const BasicTable = () => {
  const dispatch = useDispatch();
  const { sales, loading, error } = useSelector(state => state.sales);

  React.useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Para calcular las ventas por cada empresa
  const salesByCompany = sales.reduce((acc, sale) => {
    if (!acc[sale.nameAgency]) acc[sale.nameAgency] = { total: 0, commission: 0 };
    acc[sale.nameAgency].total += sale.finalPrice;
    acc[sale.nameAgency].commission += sale.finalPrice * 0.025;
    return acc;
  }, {});

  // Encuentra la empresa con el máximo total de ventas 
  const sortedCompanies = Object.keys(salesByCompany).sort((a, b) => salesByCompany[b].total - salesByCompany[a].total);
  const maxCompany = sortedCompanies.length > 0 ? sortedCompanies[0] : null;
  const maxCompanyVentas = maxCompany ? salesByCompany[maxCompany].total : 0;

  // Para calcular las ventas por mes
  const salesByMonth = sales.reduce((acc, sale) => {
    const date = new Date(sale.datePayment);
    const month = date.getMonth(); 
    const year = date.getFullYear(); 
    const monthYear = `${month + 1}-${year}`;
    if (!acc[monthYear]) acc[monthYear] = 0;
    acc[monthYear] += sale.finalPrice;
    return acc;
  }, {});

  // Encuentra el mes con el máximo total de ventas
  const sortedMonths = Object.keys(salesByMonth).sort((a, b) => salesByMonth[b] - salesByMonth[a]);
  const maxMonth = sortedMonths.length > 0 ? sortedMonths[0] : null;
  const maxMonthVentas = maxMonth ? salesByMonth[maxMonth] : 0;

  // Crear un array con los nombres de los meses
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Extraer el nombre del mes y el año del string
  const [maxMonthNumber, maxMonthYear] = maxMonth ? maxMonth.split('-') : [null, null];
  const maxMonthName = maxMonthNumber ? monthNames[maxMonthNumber - 1] : '';

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="40vh" marginBottom={50}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" marginBottom={5}>
        <Card sx={{ padding: 2, marginRight: 2, width: '50%' }}>
          {maxCompany && (
            <Box textAlign="center">
              <Typography variant="h5">
              Total ventas de la empresa con mayores ventas:
              </Typography>
              <Typography variant="h6">
              {maxCompanyVentas}
              </Typography>
            </Box>
          )}
        </Card>
        <Card sx={{ padding: 2, width: '50%' }}>
          {maxMonth && (
            <Box textAlign="center">
              <Typography variant="h5">
                Mes con mayores ventas:
              </Typography>
              <Typography variant="h6">
                {maxMonthName} 
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
      <TableContainer component={Paper} sx={{ width: '80%' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre Empresa</TableCell>
              <TableCell align="right">Total de Ventas</TableCell>
              <TableCell align="right">Comisión</TableCell>
              <TableCell align="right">Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCompanies.map((company, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{company}</TableCell>
                <TableCell align="right">{salesByCompany[company].total}</TableCell>
                <TableCell align="right">{salesByCompany[company].commission}</TableCell>
                <TableCell align="right"><Link to={`/empresas/${company}`}>Ver Detalle</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BasicTable;
