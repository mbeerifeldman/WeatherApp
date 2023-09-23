export const toggleFavorite = () => {
    return{type: 'FAVE_TOGGLE',}     
  }

export const setFavorites = (favorites) =>{
    return{
        type: 'SET_FAVORITES',
        payload : favorites,
    }
  }

  export const setLat = (lat) =>{
    return{
      type: 'SET_LAT',
      payload: lat
    }
  }

  export const setLng = (lng) =>{
    return{
      type: 'SET_LNG',
      payload: lng
  
  }
  }

  export const setCity = (city)=> {
    return {
      type: 'SET_CITY',
      payload: city,
    };
  }
  