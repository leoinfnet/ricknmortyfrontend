import axios from 'axios';
import { Personagem } from '../../models/personagem';

class UsuarioService {
  serverPath = "/api/characters";

  save(usuario){
    return axios.post("http://localhost:8080" + this.serverPath,usuario)
  }

  getAllPaginated(page:number,limit:number){
    return axios.get("http://localhost:8080" + this.serverPath,{
      headers:{
        "page": page,
        "size": limit
      }
    })
  }

  delete(id){
    return axios.delete("http://localhost:8080" + this.serverPath + "/" + id)
  }

  getById(id:number){
    return axios.get<Personagem>(`http://localhost:8080${this.serverPath}/${id}`)
  }

  update(id:number,personagem){
    return axios.put(`http://localhost:8080${this.serverPath}/${id}`,personagem)
  }
}
export default UsuarioService;