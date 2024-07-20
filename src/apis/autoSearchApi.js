import axios from 'axios';

export const autoSearchApi = async ({searchInput}) => {
    const options = {
        method: 'GET',
        url: 'https://yummly2.p.rapidapi.com/feeds/auto-complete',
        params: {
          q: searchInput,
          limit: '10', // Adjust limit as per your UI requirement
          start: '0'
        },
        headers: {
          'x-rapidapi-key': 'a7dcb20d73msh65c4b51b935b859p12e644jsn207e363a16e5',
          'x-rapidapi-host': 'yummly2.p.rapidapi.com'
        }
      };

  try {

    const response = await axios.request(options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




