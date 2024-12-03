import {
  Box,
  Card,
  CardHeader,
  Divider, IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow, Tooltip, Typography, useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CharacterStatus, Personagem } from '../../../models/personagem';
import UsuarioService from '../../../services/PersonagemService';
import Label from '../../../components/Label';


const UsersTable:React.FC = () =>{

  const getStatusLabel = (status:CharacterStatus) => {
    const map ={
      Alive: {
        text: "Alive",
        color: 'success'
      },
      Dead: {
        text: "Dead",
        color: 'error'
      },
      unknown: {
        text: 'Unknown',
        color: 'warning'
      }
    }
    const {text,color }: any = map[status]
    return <Label color={color}>{text}</Label>
  }


  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const usuarioService = new UsuarioService();
  const [page,setPage] = useState<number>(0);
  const [limit,setLimit] = useState<number>(10);;
  const [total,setTotal]= useState<number>(0);
  const theme = useTheme();
  const handlePageChance =(event,newPage) =>{
    console.log(newPage)
    usuarioService.getAllPaginated(newPage,limit).then((response) =>{
      setTotal(parseInt(response.headers['x-total-count']))
      setPersonagens(response.data);
    })
    setPage(newPage)
  }
  const handleLimitChange = (event) =>{
    console.log(event.target.value)
    setPage(0)
    setLimit(parseInt(event.target.value))
    usuarioService.getAllPaginated(0,parseInt(event.target.value)).then((response) =>{
      setTotal(parseInt(response.headers['x-total-count']))
      setPersonagens(response.data);
    })

  }
  useEffect(() => {
     usuarioService.getAllPaginated(0,10).then((response) =>{
       setTotal(parseInt(response.headers['x-total-count']))
       setPersonagens(response.data);

     })
  }, []);
  return (
    <Card>
      <CardHeader title="Personagens" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {personagens.map((personagem:Personagem) =>{
                return (
                  <TableRow hover key={personagem.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap>

                      {personagem.id}
                    </Typography>
                  </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                    noWrap>
                    {personagem.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                    noWrap>

                    {getStatusLabel(  personagem.status)}

                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                    noWrap>
                    {personagem.origin}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver Mais" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small">
                      <AddTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar Personagem" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small">
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Deletar Personagem" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.error.lighter
                        },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small">
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

                )
              })}


          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={limit}
          onRowsPerPageChange={handleLimitChange}
          onPageChange={handlePageChance}
          rowsPerPageOptions={[5,10,25,50,70]}
        >
        </TablePagination>
      </Box>

    </Card>
  )
}
export default UsersTable