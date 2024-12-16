import { Button, Grid, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';

const PageHeader:React.FC = () =>{
  const navigate = useNavigate();

  return (

    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
         <Typography variant="h3" component="h3" gutterBottom>
           Editar Usuario
         </Typography>
      </Grid>

    </Grid>
  );
}
export default PageHeader;