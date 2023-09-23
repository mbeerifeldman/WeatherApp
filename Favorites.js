import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { setCity } from './redux/actions'
import { useDispatch } from 'react-redux'

function Favorites(props) {
  const location = useLocation()
  const dispatch = useDispatch()
  

  const cityLocation = (city) => {
    dispatch(setCity(encodeURIComponent(city)))
  };

  return (
    <div>
      {location.pathname === '/favorites' && (
        <div>
          <h3>My Favorites</h3>

          {props.data && props.data.map((forecast, index) => (
            <div key={index} className='forecastBox'>
              <h4>City: {(forecast.cityName)}</h4>
              <p>Temperature: {forecast.current.Temperature.Metric.Value} {forecast.current.Temperature.Metric.Unit}</p>
              {location.pathname === '/favorites' && (
                <Link to={`/map/${forecast.cityName}`}>
                  <input
                    type="button"
                    onClick={() => cityLocation(forecast.cityName)}
                    value="Map of location"
                  />
                  
                </Link>
              )}
            </div>
          ))}
          <button className='checkbox' onClick={props.clearFavorites}>Clear Favorites</button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
