import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import { setFavorites } from './redux/actions'
import Header from './Header'
import Main from './Main'
import NavBar from './NavBar'
import Favorites from './Favorites'
import GMaps from './GMaps'
import store from './redux/configureStore'

const apiKey = '2e6pcsGJA2sCMvXUcPHOD3ER3RQnKSSa'

function App() {
    const isFavorite = useSelector((state) => state.isFavorite)
    const favorites = useSelector((state) => state.favorites)
    const dispatch = useDispatch()
    let newFavorites

    const [searchBar, setSearch] = useState('')
    const [cityName, setName] = useState('')
    const [cityKey, setKey] = useState('')
    const [current, setCurrent] = useState('')
    const [fiveDay, setDay] = useState('')

    useEffect(() => {
        fetchCity('tel aviv')
    }, [])

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
        dispatch(setFavorites(JSON.parse(storedFavorites)))
        }
        if(storedFavorites && storedFavorites.includes(cityName)){
            dispatch({type: 'FAVE_TOGGLE', payload: true})
        }
        else{dispatch({type: 'FAVE_TOGGLE', payload: false})}
    }, [cityName])


    const addToFavorites = () => {
        const isAlreadyFavorite = favorites.some((item) => item.cityName === cityName)
    
        if (isAlreadyFavorite) {
        newFavorites = favorites.filter((item) => item.cityName !== cityName)
        dispatch({type: 'FAVE_TOGGLE', payload: false})
        } 
        else {
        const faveArray = {
            cityName: cityName,
            current: current,
        }
        newFavorites = [...favorites, faveArray]
        dispatch({type: 'FAVE_TOGGLE', payload: true})
        }
        
    
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        console.log(localStorage)
        dispatch(setFavorites(newFavorites))
    }

    const fetchCity = (location) => {
        const bases = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
        const querys = `?apikey=${apiKey}&q=${location} `;
        axios.get(bases + querys).then((response) => {
        setSearch('');
        setName(response.data[0].LocalizedName);
        setKey(response.data[0].Key);
        fetchCurrentConditions(response.data[0].Key);
        fetchFiveDay(response.data[0].Key);
        })
    }

    const fetchCurrentConditions = (key) => {
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${key}?apikey=${apiKey}`
        axios.get(base + query).then((response) => {
        setCurrent(response.data[0])
        })
    }

    const fetchFiveDay = (key) => {
        const based = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
        const queryed = `${key}?apikey=${apiKey}&metric=${true}`;
        axios.get(based + queryed).then((response) => {
        setDay(response.data.DailyForecasts);
        });
    };

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const submittedCity = searchBar


        setName(submittedCity)
        fetchCity(submittedCity)
    };

    const clearFavorites = () => {
        dispatch(setFavorites([]))
        localStorage.removeItem('favorites')
    };

    return (
        <Provider store={store}> 
            <BrowserRouter>
            <Routes>
                <Route
                path="/"
                element={
                    <div>
                    <Header />
                    <NavBar />
                    <Main
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        data={{
                        searchBar,
                        cityKey,
                        current,
                        cityName,
                        fiveDay,
                        }}
                    />

                    <label className="checkbox">
                        Favorite
                        <input
                        type="checkbox"
                        checked={isFavorite}
                        onChange={addToFavorites}
                        />
                        <span className="checkmark"></span>
                    </label>
                    </div>
                }
                />
                <Route
                path="/favorites"
                element={
                    <div>
                    <Header />
                    <NavBar />
                    <Favorites data={favorites} clearFavorites={clearFavorites} />
                    </div>
                }
                />
                <Route 
                    path="/map/:cityName"
                    element ={
                        <div>
                            <Header />
                            <NavBar />
                            <GMaps />
                        </div>
                    }
                /> 
            </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
