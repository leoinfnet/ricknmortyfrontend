import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import LocationsSelect from '../../../components/LocationsSelect';
import DefaultSelect from '../../../components/DefaultSelect';
import SpeciesService from '../../../services/SpeciesService';
import UsuarioService from '../../../services/PersonagemService';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import DefaultController from '../../../components/DefaultController';
import GenderService from '../../../services/GenderService';
import locationsService from '../../../services/locationsService';
import LocationsService from '../../../services/locationsService';
import StatusService from '../../../services/StatusService';


const UsuarioFormEditValidacao:React.FC = () => {
  let usuarioService = new UsuarioService();
  const {id} = useParams();
  useEffect(() => {
    usuarioService.getById(parseInt(id)).then((response) =>{
      const personagem = response.data;
      setValue("name",personagem.name || "", {shouldTouch:true})
      setValue("type",personagem.type || "", {shouldTouch:true})
      setValue("gender",personagem.gender, {shouldTouch:true})
      setValue("species",personagem.species || "", {shouldTouch:true})
      setValue("location",personagem.location || "", {shouldTouch:true})
      setValue("status",personagem.status || "", {shouldTouch:true})
    })

  }, []);

  interface IFormInput{
    name: string;
    gender: "",
    status: "",
    location: "",
    species: "",
    type: "",
    episodeCount: ""
  }
  const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório")
      .min(3, "O nome deve ter mais de 3 letras.").max(20, "O nome deve ter até 20 letras."),
    //type: yup.string().email("O campo deve ser um email válido.")
    type: yup.string(),//.required("O cpf é obrigatório").test('is-valid-cpf','O cpf é inválido.', validateCPF),
    gender: yup.string(),
    status: yup.string(),
    episodeCount: yup.string(),
    location: yup.string(),
    species: yup.string()
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    control
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      gender: 'FEMALE', // Definindo um valor inicial
      status: 'unknown', // Definindo um valor inicial
      episodeCount: '',
      location: '',
      species: '',
      type: ''
    }
  });

  const onSubmit = (data:IFormInput) =>{
    usuarioService.update(parseInt(id),data).then((reponse) =>{
      toastSucesso();
    }).catch(error => {
      toastError()
    })
  }

  const toastSucesso = () => toast.success("Usuario Editado com sucesso",{position: 'top-center'})
  const toastError = () => toast.error("Ops, algo de errado aconteceu.",{position: 'top-center'})

  return (
  <>
    <Helmet>
      <title>Editar de Usuario</title>
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
                onSubmit={handleSubmit(onSubmit)}

                sx={{
                  '& .MuiTextField-root': { m: 1, width: '30ch' }
                }}
                noValidate
                autoComplete="off"
              >

                <Grid container spacing={3}>
                  <Grid  item>
                    <TextField
                      fullWidth
                      required
                      id="name"
                      label="Nome"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>

                  <Grid  item>
                    <TextField
                      fullWidth
                      required
                      id="type"
                      label="Tipo"
                      {...register("type")}
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    />
                  </Grid>
                  <Grid  item>

                    <DefaultController
                      name="gender"
                      label="Genero"
                      id="gender"
                      control={control}
                      errors={errors.type}
                      service={new GenderService()} />

                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item>
                    <DefaultController
                      name="location"
                      label="Location"
                      id="location"
                      control={control}
                      errors={errors.location}
                      service={new LocationsService()} />
                  </Grid>

                  <Grid item>
                    <DefaultController
                      name="species"
                      label="Especie"
                      id="species"
                      control={control}
                      errors={errors.species}
                      service={new SpeciesService()} />
                  </Grid>
                  <Grid item>
                    <DefaultController
                      name="status"
                      label="Status"
                      id="status"
                      control={control}
                      errors={errors.status}
                      service={new StatusService()} />
                  </Grid>
                </Grid>


                <Grid container spacing={3}>
                  <Grid sm item>
                    <Button type="submit" fullWidth variant="contained">
                      Editar
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
export default  UsuarioFormEditValidacao;