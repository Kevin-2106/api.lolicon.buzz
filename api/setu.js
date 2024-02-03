import axios from 'axios';
import { URLSearchParams } from 'url';

export default async (req, res) => {
  try {
    // Convert req.query object to URLSearchParams
    const params = new URLSearchParams(req.query);

    const response = await axios.get('https://api.lolicon.app/setu/v2', { params });
    
    // Check if the data array is not empty
    if (response.data.data.length > 0) {
      const redirectUrl = response.data.data[0].urls.original;
      
      res.setHeader('Location', redirectUrl);
      res.status(307).end();
    } else {
      res.status(404).send({ error: 'No data found in the response' });
    }
    
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).send({ error: 'No response received from the server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).send({ error: 'An error occurred while trying to fetch the URL' });
    }
  }
};
