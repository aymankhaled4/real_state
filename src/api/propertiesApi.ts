import axios from 'axios'

export default async function propertiesApi() {
    const response = await axios.get('http://localhost:3001/properties')
    return response.data;
}
