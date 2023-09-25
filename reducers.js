import { combineReducers } from "redux"

const initialState = {
  isFavorite: false,
  favorites: [],
  city : '',
  searchBar: '',
  cityName: '',
  cityKey: '',
  current: '',
  fiveDay: '',
  //error: false,
};

function fetchReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SEARCH_BAR':
      return { ...state, searchBar: action.payload };
    case 'SET_CITY_NAME':
      return { ...state, cityName: action.payload };
    case 'SET_CITY_KEY':
      return { ...state, cityKey: action.payload };
    case 'SET_CURRENT':
      return { ...state, current: action.payload };
    case 'SET_FIVE_DAY':
      return { ...state, fiveDay: action.payload };
    default:
      return state;
  }}

const isFavoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FAVE_TOGGLE':
        return {isFavorite : action.payload}
      case 'ERROR_TOGGLE':
        return {error : action.payload}
      default:
        return state
    }
  }
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FAVORITES':
        return { ...state, favorites: action.payload };
      case 'SET_CITY':
        return { ...state, city: action.payload };
      default:
        return state;
    }
  }  
  const coorReducer = (state = 0,  action) =>{
    switch(action.type){
        case 'SET_LAT':
            return { lat : action.payload }
        case 'SET_LNG':
            return {lng : action.payload}
      default:
        return state
    }}


 
export const rootReducer = combineReducers({
    isFavorite: isFavoriteReducer,
    favorites: favoritesReducer,
    coor: coorReducer,
    fetch : fetchReducer
  })


