import React from 'react';
import { useLocation } from 'react-router-dom';

function Favorites(props) {
    const location = useLocation();
    //console.log(props)

    return (
        <div>
            {location.pathname === '/favorites' && (
                <div>
                    <h3>My Favorites</h3>
                    
                        {props.data && props.data.map((forecast, index) => (
                            <div key = {index} className='forecastBox'>
                                <h4>City: {forecast.cityName}</h4>
                                <p>Temperature: {forecast.current.Temperature.Metric.Value} {forecast.current.Temperature.Metric.Unit}</p>
                                
                            </div>
                    ))}
                    
                    <button className = 'checkbox' onClick={props.clearFavorites}>Clear Favorites</button>  
                </div>
            )}
            </div>)
}
export default Favorites