import axios from 'axios';

export const recipeApi = async () => {
  const options = {
    method: 'GET',
    url: 'https://yummly2.p.rapidapi.com/feeds/list',
    params: {
      limit: '50',
      start: '0'
    },
    headers: {
      'x-rapidapi-key': 'a7dcb20d73msh65c4b51b935b859p12e644jsn207e363a16e5',
      'x-rapidapi-host': 'yummly2.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
