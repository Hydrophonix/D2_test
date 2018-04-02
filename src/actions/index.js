import api from '../api'

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export const SEARCH_PARAMS = 'SEARCH_PARAMS';

export const fetchMovies = searchParams => dispatch => {
  dispatch({
    type: REQUEST_MOVIES
  });

  return api.getMovieByName(searchParams)
  .then(data =>
    dispatch({
      type: RECEIVE_MOVIES,
      data: data
    })
  )
};

export const searchParams = params => ({
  type: SEARCH_PARAMS,
  name: params.name,
  year: params.year,
  page: params.page
})
