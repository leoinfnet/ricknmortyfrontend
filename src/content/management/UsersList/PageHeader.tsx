import { Button, Grid, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';

const PageHeader:React.FC = () =>{
  const navigate = useNavigate();

  return (

    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
         <Typography variant="h3" component="h3" gutterBottom>
           Usuarios Cadastrados
         </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={() => navigate("/management/new-user")}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
        Cadastrar Usuário
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={() => navigate("/management/new-user-validacao")}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Cadastrar Usuário Com validacao
        </Button>
      </Grid>
    </Grid>
  );
}
export default PageHeader;