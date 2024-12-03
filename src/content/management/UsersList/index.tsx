import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import UsersTable from './UsersTable';


function UsersList() {
  return (
    <>
      <Helmet>
        <title>Usuários</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            <UsersTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UsersList;
