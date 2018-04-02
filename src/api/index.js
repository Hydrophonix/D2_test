import axios from 'axios'

const API_PREFIX = 'https://api.themoviedb.org';
const API_TOKEN = '5874acfd11651a28c55771624f7021f4';

export function getMovieByName(searchParams) {
  if (searchParams.name) {
    const params = {
      api_key: API_TOKEN,
      language: 'en-US',
      include_adult: 'false',
      query: searchParams.name,
      page: searchParams.page || 1,
      year: searchParams.year
    };
    return axios
        .get(`${API_PREFIX}/3/search/movie`, { params })
        .then(response => response.data)
  } else {
    const params = {
      api_key: API_TOKEN,
      language: 'en-US',
      'primary_release_date.gte': '2018-04-01',
      'primary_release_date.lte': '2018-04-02',
      page: searchParams.page || 1
    }
    return axios
        .get(`${API_PREFIX}/3/discover/movie`, { params })
        .then(response => response.data)
  }

}

export default { getMovieByName };
