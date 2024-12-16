import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select
} from '@mui/material';
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

interface TypePayload {
  id: number;
  name: string;
}
const UsuarioFormValidacao:React.FC = () => {
  const location = useLocation();

  const validateCPF = (value: string) => {
    // Remover caracteres não numéricos (como pontos e traços)
    const cleanedValue = value.replace(/\D/g, '');

    // CPF deve ter exatamente 11 dígitos
    if (cleanedValue.length !== 11) {
      return false;
    }

    // Validação de CPF padrão (todos os números iguais, como "111.111.111-11" ou "000.000.000-00")
    if (/^(\d)\1{10}$/.test(cleanedValue)) {
      return false;
    }

    // Calculando o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedValue.charAt(i)) * (10 - i);
    }
    let firstVerifier = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

    // Calculando o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedValue.charAt(i)) * (11 - i);
    }
    let secondVerifier = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

    // Verifica se os dígitos verificadores calculados são iguais aos do CPF
    return cleanedValue.charAt(9) === firstVerifier.toString() && cleanedValue.charAt(10) === secondVerifier.toString();
  };


  interface IFormInput{
    name: string;
    gender: "",
    status: "Unknow",
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
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)})

  const onSubmit = (data:IFormInput) =>{
    let usuarioService = new UsuarioService();
    console.log(data);
    usuarioService.save(formData).then((reponse =>{
      toastSucesso();
    })).catch((error) =>{
      toastError()
    })
  }
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
  const [value, setValue] = useState(null);


  const handleChangeNome = (e) =>{
    console.log(e.target);
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<TypePayload[]>([]);


  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
  };
  const handleSearch = (event: React.ChangeEvent<{}>, value: string) => {
    // Filtra a lista de criaturas com base no texto digitado
    console.log("Triggered");
    if (value.length >= 3) {
      console.log(value);
    }
  };

  //Não usaremos mais esse campo.
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
                onSubmit={handleSubmit(onSubmit)}

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
                    {...register("name")}
                    error={!! errors.name }
                    helperText={errors.name?.message}

                  />
                  <TextField
                    id = "gender"
                    select
                    label = "Gender"
                    name="gender"
                    {...register('gender')}
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

                    {...register('status')}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}

                  </TextField>

                </div>
                <div>
                  <LocationsSelect name="location" value={formData.location} handleChange={handleChange} register={register} />

                  <DefaultSelect name="species" value={formData.species}
                                 label="Especie"
                                 id="species"
                                 handlechange={handleChange}
                                 service={new SpeciesService()}
                                 {...register('species')}
                    register={register}
                  />


                </div>
                <div>
                  <TextField
                    fullWidth
                    required
                    id="episodeCount"
                    label="Quantidade de Episodios"
                    name='episodeCount'
                    {...register('episodeCount')}
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
export default  UsuarioFormValidacao;