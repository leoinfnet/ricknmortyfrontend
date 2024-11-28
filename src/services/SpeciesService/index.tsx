import DefaultService from '../DefaultService';
import axios from 'axios';

class SpeciesService implements DefaultService{
    getAll() {
        return axios.get("http://localhost:8080/api/species")
    }

}
export default SpeciesService