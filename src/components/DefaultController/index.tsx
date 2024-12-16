import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

interface DefaultSelectProps {
  name: string;
  label: string;
  id: string;
  control: any; // Adapte este tipo também
  errors: any; // Tipagem de erros, de preferência use o tipo `FieldError` do react-hook-form
  service: any,
  children?: React.ReactNode; // Aceita children
}

const DefaultController: React.FC<DefaultSelectProps> = ({
                                                           name,
                                                           label,
                                                           id,
                                                           control,
                                                           errors,
                                                           service,
                                                           children
                                                         }) => {

  const [values, setValues] = useState([]);
  useEffect(() => {
    service.getAll().then((response) =>{
      setValues(response.data)
    })
  }, []);
  return <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        id={id}
        select
        label={label}
        {...field}
        error={!!errors}
        helperText={errors?.message}
        fullWidth
      >
        {values.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    )}
  />;
};
export default DefaultController;