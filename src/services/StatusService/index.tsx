import DefaultService from '../DefaultService';

class StatusService implements DefaultService{
    getAll() {
      return Promise.resolve({
        data:[
          {value: "Alive", name: "Alive" },
          {value: "Dead", name: "Dead" },
          {value: 'unknown', name: "unknown"}
        ]
      });
    }

}
export default StatusService;