import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setName, setKey, setCurrent, setFive } from './redux/actions'

const apiKey = '2e6pcsGJA2sCMvXUcPHOD3ER3RQnKSSa'



function API(){
  const dispatch = useDispatch()


  const fetch = (base, query) => {
    return axios.get(base + query);
  }

  const fetchCity = async (location) => {
    const bases = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const querys = `?apikey=${apiKey}&q=${location}`

    try {
      const response = await fetch(bases, querys);
      dispatch({type:'SET_SEARCH', payload:'' })
      dispatch(setName(response.data[0].LocalizedName))
      dispatch(setKey(response.data[0].Key))
      fetchCurrentConditions(response.data[0].Key);
      fetchFiveDay(response.data[0].Key);
    } catch (error) {
        dispatch({type: 'ERROR_TOGGLE', payload: true})
    }
  };

  const fetchFiveDay = async (key) => {
    const based = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}`;
    const queryed = `?apikey=${apiKey}&metric=true`

    try {
      const response = await fetch(based, queryed)
      dispatch(setFive(response.data.DailyForecasts))
    } catch (error) {
        dispatch({type: 'ERROR_TOGGLE', payload: true})
    }
  };

  const fetchCurrentConditions = async (key) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/${key}`;
    const query = `?apikey=${apiKey}`;

    try {
      const response = await fetch(base, query)
      dispatch(setCurrent(response.data[0]))
    } catch (error) {
        dispatch({type: 'ERROR_TOGGLE', payload: true})
    }
  }

  return{
    fetchCity,
    fetchFiveDay,
    fetchCurrentConditions}
    
}

export default API



