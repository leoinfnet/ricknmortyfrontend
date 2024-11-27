import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

const UsuarioForm:React.FC = () => {
  return (
  <>
    <Helmet>
      <title>Cadastro de Usuario</title>
    </Helmet>
    <PageTitleWrapper>
      <PageHeader />
    </PageTitleWrapper>

    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={6}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Preencha o formulario" />
            <Divider />
            <CardContent>
              <Box
                component="form"


                sx={{
                  '& .MuiTextField-root': { m: 1, width: '30ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <div>

                </div>

                <Grid container spacing={3}>


                </Grid>


              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Container>

  </>
  );
}
export default  UsuarioForm;