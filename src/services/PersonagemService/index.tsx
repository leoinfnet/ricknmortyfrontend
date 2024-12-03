import axios from 'axios';

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
}
export default UsuarioService;