import axios from 'axios';

export const getLocations = () =>{
  return axios.get("http://localhost:8080/api/locations")
}