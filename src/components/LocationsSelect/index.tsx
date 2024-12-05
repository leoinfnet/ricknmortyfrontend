import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLocations } from '../../services/locationsService';

const LocationsSelect = ({name,value,handleChange,register}) =>{
  const [locations, setLocations] = useState([])
  useEffect(() => {
    getLocations()
      .then((response) =>{
          setLocations(response.data)
    })
  }, []);
  return <TextField
    id="locations"
    select
    label = "Locations"
    {...register('location')}
    name={name}
    value={value}
    onChange={handleChange}
  >

    {locations.map((option) => (
      <MenuItem key={option.name} value={option.name}>
        {option.name}
      </MenuItem>
    ))};

  </TextField>
}
export default LocationsSelect;