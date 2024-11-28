import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import LocationsSelect from '../../../components/LocationsSelect';
import DefaultSelect from '../../../components/DefaultSelect';
import SpeciesService from '../../../services/SpeciesService';
import UsuarioService from '../../../services/PersonagemService';
import toast, { Toaster } from 'react-hot-toast';

const UsuarioForm:React.FC = () => {
  const toastSucesso = () => toast.success("Usuario cadastrado com sucesso",{position: 'top-center'})
  const toastError = () => toast.error("Ops, algo de errado aconteceu.",{position: 'top-center'})

  const gender = [
    {value: "MALE", label: "Male" },
    {value: "FEMALE", label: "Female" }
  ]
  const status = [
    {value: "ALIVE", label: "Alive" },
    {value: "DEATH", label: "Death" },
    {value: 'Unknow', label: "Unknow"}

  ]
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    status: "Unknow",
    location: "",
    species: "",
    type: "",
    episodeCount: ""
  })

  const handleChangeNome = (e) =>{
    console.log(e.target);
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  const hadleSubmit = (event) =>{
    event.preventDefault();
    let usuarioService = new UsuarioService();
    usuarioService.save(formData).then((reponse =>{
      console.log("Salvo com sucesso");
      toastSucesso();
    })).catch((error) =>{
      console.log(error);
      toastError()
    })
    console.log(formData);
  }
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
                onSubmit={hadleSubmit}

                sx={{
                  '& .MuiTextField-root': { m: 1, width: '30ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    fullWidth
                    required
                    id="name"
                    label = "Nome"
                    name = "name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <TextField
                    id = "gender"
                    select
                    label = "Gender"
                    value = {formData.gender}
                    onChange={handleChange}
                    name="gender"
                    >
                    {gender.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                            {option.label}
                      </MenuItem>
                    ))}

                  </TextField>

                  <TextField
                    id = "status"
                    select
                    label = "Status"
                    value = {formData.status}
                    onChange={handleChange}
                    name="status"
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}

                  </TextField>

                </div>
                <div>
                  <LocationsSelect name="location" value={formData.location} handleChange={handleChange} />

                  <DefaultSelect name="species" value={formData.species}
                                 label="Especie"
                                 id="species"
                                 handlechange={handleChange}
                                 service={new SpeciesService()}
                  />

                  <TextField
                    fullWidth
                    id="type"
                    label="Type"
                    name='type'
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="episodeCount"
                    label="Quantidade de Episodios"
                    name='episodeCount'
                    value={formData.episodeCount}
                    onChange={handleChange}
                    type="number"

                  />
                </div>

                <Grid container spacing={3}>
                  <Grid sm item>
                    <Button type="submit" fullWidth variant="contained">
                      Cadastrar
                    </Button>
                  </Grid>

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