export const toggleFavorite = () => {
  return{type: 'FAVE_TOGGLE',}     
}


export const toggleError = ()=> {
  return {type: 'ERROR_TOGGLE',}
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
}
}

export const setSearch = (searchBar)=> {
return {
  type: 'SET_SEARCH_BAR',
  payload: searchBar,
}
}

export const setName = (cityName)=> {
return {
type: 'SET_CITY_NAME',
payload: cityName,
}
}

export const setKey = (cityKey)=> {
return {
  type: 'SET_CITY_KEY',
  payload: cityKey,
  }
}

export const setCurrent = (current)=> {
return {
  type: 'SET_CURRENT',
  payload: current,
  }
}

export const setFive = (fiveDay)=> {
return {
  type: 'SET_FIVE_DAY',
  payload: fiveDay,
  }
}






