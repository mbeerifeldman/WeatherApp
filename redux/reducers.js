import { combineReducers } from "redux"


const initialState = {
    isFavorite: false,
    favorites: [],
    lat : 0,
    lng: 0,
    city : '',
}

const isFavoriteReducer = (state = initialState.isFavorite, action) => {
    switch (action.type) {
      case 'FAVE_TOGGLE':
        return action.payload
      default:
        return state
    }
  }
  
  const favoritesReducer = (state = initialState.favorites, action) => {
    switch (action.type) {
      case 'SET_FAVORITES':
        return action.payload
      default:
        return state
    }
  }
  const latReducer = (state = initialState.lat, action) =>{
    switch(action.type){
        case 'SET_LAT':
            return action.payload
        default:
            return state
    }
  }

  const lngReducer = (state = initialState.lng, action) =>{
    switch(action.type){
        case 'SET_LNG':
            return action.payload
        default:
            return state
    }
  }

  const cityReducer = (state = initialState.city, action) =>{
    switch (action.type) {
      case 'SET_CITY':
        return action.payload
      default:
        return state;
    }}




  
export const rootReducer = combineReducers({
    isFavorite: isFavoriteReducer,
    favorites: favoritesReducer,
    lat : latReducer,
    lng : lngReducer,
    city: cityReducer
  })

