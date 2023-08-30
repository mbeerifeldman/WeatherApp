import React from 'react';
import Icon from './Icon'


function Main(props) {
    const dateTime = props.data.current ? props.data.current.LocalObservationDateTime : '';
    const temperature = props.data.current ? props.data.current.Temperature : null;

    return (
        <div>
            <form className='form' onSubmit={props.handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter City'
                    value={props.data.searchBar}
                    onChange={props.handleInputChange}
                    name='searchBar'
                />
                <button type='submit'>Submit</button>
            </form>
            <div>
                <div className='basicInfo'>
                    <div className = 'current'>
                        <h1>{props.data.cityName}</h1>
                        <h3>Date: {dateTime.slice(0, 10)}</h3>
                        <h3>Time: {dateTime.slice(11, 19)}</h3>
                        <h3>Current Weather: {props.data.current.WeatherText}</h3>
                        {temperature && (
                            <h3>
                                Temperature: {temperature.Metric.Value} {temperature.Metric.Unit}
                            </h3>
                        )}
                        
                    </div>
                    <div>
                        <h3>Next Upcoming Five Days</h3>
                        {props.data.fiveDay && props.data.fiveDay.map((forecast, index) => (
                        <div key = {index} className='forecastBox'>
                            <h4>Date: {forecast.Date.slice(0, 10)}</h4>
                            <p>Temperature: {forecast.Temperature.Maximum.Value} {forecast.Temperature.Maximum.Unit}</p>
                            <p>Weather: {forecast.Day.IconPhrase}</p>
                            <Icon 
                                datas={forecast.Day.IconPhrase}
                            />
                        </div>
                        ))}
                    </div>
                </div>
                
            </div>
         
        </div>
    );
}

export default Main;
