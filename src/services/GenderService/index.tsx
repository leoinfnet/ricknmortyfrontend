import DefaultService from '../DefaultService';

class GenderService implements DefaultService {
    getAll() {
        return Promise.resolve({
          data:[
            { value: "Male", name: "Male" },
            { value: "Female", name: "Female" }
          ]
          }
        );
    }

}
export default GenderService;