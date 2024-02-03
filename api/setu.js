// 在 /api/redirect.js 文件中
import { get } from 'axios';

export default async (req, res) => {
  try {
    const response = await get('https://api.lolicon.app/setu/v2');
    const redirectUrl = response.data.data.urls.original;
    
    res.setHeader('Location', redirectUrl);
    res.status(307).end();
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while trying to fetch the URL' });
  }
};
