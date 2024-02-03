import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get('https://api.ln.app/setu/v2', { params: req.query });
    const redirectUrl = response.data.data.urls.original;
    
    res.setHeader('Location', redirectUrl);
    res.status(307).end();
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
