import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const DefaultSelect = ({name,value,label,id,handlechange,service,register}) =>{
  const [values, setValues] = useState([]);
  useEffect(() => {
    service.getAll().then((response) =>{
        setValues(response.data)
    })
  }, []);
  return <TextField
      id={id}
      select
      label={label}
      name={name}
      value={value}
      onChange={handlechange}

    >
    {values.map((option) => (
      <MenuItem key={option.name} value={option.name}>
        {option.name}
      </MenuItem>
    ))};

  </TextField>
}
export default DefaultSelect;