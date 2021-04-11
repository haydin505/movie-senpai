import * as actionTypes from "../actions/actionTypes";

const initialState = {
  fetchedMovies: null,
  fetchMoviesError: null,
  favoriteMovies: null,
  watchLaterMovies: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        fetchedMovies: action.fetchedMovies,
      };
    case actionTypes.FETCH_MOVIES_FAIL:
      return {
        ...state,
        fetchMoviesError: action.error,
      };
    case actionTypes.POST_WATCHLATER_MOVIE_SUCCESS:
      return {
        ...state,
        fetchFavoriteMovies: action.fetchFavoriteMovies,
      };
    case actionTypes.UPDATE_FAVORITE_MOVIES_SUCCESS:
      return {
        ...state,
        favoriteMovies: action.movies,
      };
    case actionTypes.UPDATE_WATCHLATER_MOVIES_SUCCESS:
      return {
        ...state,
        watchLaterMovies: action.movies,
      };
    default:
      return state;
  }
};

export default reducer;
