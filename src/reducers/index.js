import { combineReducers } from 'redux'

import { REQUEST_MOVIES, RECEIVE_MOVIES, SEARCH_PARAMS } from '../actions'

const search = (state = { name: '', year: '', page: ''}, action) => {
  switch (action.type) {
    case SEARCH_PARAMS: {
      return {
        ...state,
        name: action.name || state.name,
        year: action.year || state.year,
        page: action.page
      }
    }

    default: {
      return state
    }
  }
};

const movies = (state = { isFetching: true, data: {} }, action) => {
  switch (action.type) {
    case REQUEST_MOVIES: {
      return {
        ...state,
        isFetching: true
      }
    }

    case RECEIVE_MOVIES: {
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    }

    default: {
      return state
    }
  }
};

export default combineReducers({ movies, search})
