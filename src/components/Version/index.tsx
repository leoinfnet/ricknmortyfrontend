import { useEffect, useState } from 'react';
import axios from 'axios';

const Version:React.FC = () => {
  const [version, setVersion]
    = useState("")
  useEffect(() => {
    axios.get("http://localhost:8080/api/version")
      .then((response) => {
        setVersion(response.data.version)
      });
  }, []);

  return <p>Version: {version}</p>
}
export default Version;