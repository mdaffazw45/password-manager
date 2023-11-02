import axios from 'axios';

export async function postDataToServer(data) {
  try {
    const response = await axios.post('http://localhost:3000/posts', data);
    console.log('Response from the server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}
