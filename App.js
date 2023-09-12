import React, {useEffect, useState, useReducer} from 'react'
import Header from './Header'
import Main from './Main'
import NavBar from './NavBar'
import Favorites from './Favorites'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'


const apiKey = '2e6pcsGJA2sCMvXUcPHOD3ER3RQnKSSa'


function App() {
    const reducer = (state, action) =>{
        switch (action.type){
            case 'FAVE_TOGGLE' : 
                return !state
            default: 
                return state  
        }
    }


    const [searchBar, setSearch] = useState('')
    const [cityName, setName] = useState('')
    const [cityKey, setKey] = useState('')
    const[current, setCurrent] = useState('')
    const[fiveDay, setDay] = useState('')
    const[favorites, setFavorites] = useState([])
    const[isFavorite, dispatchIsFavorite] = useReducer(reducer, false)

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        }

        fetchCity('tel aviv', () => {
            if (storedFavorites.includes(cityName)) {
                dispatchIsFavorite({type : 'FAVE_TOGGLE'})
            }
        })

    }, [])


    const addToFavorites = () => {
        const isAlreadyFavorite = favorites.includes(cityName)
        let newFavorites;

        if (isFavorite || isAlreadyFavorite) {
            newFavorites = favorites.filter(
                item => item.cityName !== cityName
            );
        } else if (!isAlreadyFavorite) {
            const faveArray = {
                cityName : cityName,
                current: current,

            }
            newFavorites = [
                ...favorites, faveArray
            ]
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        dispatchIsFavorite({type : 'FAVE_TOGGLE'})
        setFavorites(newFavorites)
            

    }
    const fetchCity = (location) => {
        const bases = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        const querys = `?apikey=${apiKey}&q=${location} `
        axios.get(bases + querys)
            .then((response)=>{
                setSearch('')
                setName(response.data[0].LocalizedName)
                setKey(response.data[0].Key)
                fetchCurrentConditions(response.data[0].Key) //fix
                fetchFiveDay(response.data[0].Key)
                const isCityFavorite = favorites.includes(cityName);
                dispatchIsFavorite({type : 'FAVE_TOGGLE'})
            
            })   
    }

    const fetchCurrentConditions = (key) =>{
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
        const query = `${key}?apikey=${apiKey}`
        axios.get(base+query)
            .then((response)=>{
                setCurrent(response.data[0])
                })
    }

    const fetchFiveDay = (key) =>{
        const based = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
        const queryed = `${key}?apikey=${apiKey}&metric=${true}`
        axios.get(based+queryed)
            .then((response)=>{
                setDay(response.data.DailyForecasts)
                })
    }

    const handleInputChange = (event) => {
        setSearch(event.target.value)
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchCity(searchBar);
        
    }
    const clearFavorites = () => {
        setFavorites([])
        dispatchIsFavorite({type : 'FAVE_TOGGLE'})
        localStorage.removeItem('favorites')
    }
    return (
        <div>
            {console.log(favorites)}
            <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<div>
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
                                fiveDay
                            }}
                        />

                    <label 
                        className="checkbox">Favorite
                        <input type="checkbox" 
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
                    element={<div>
                        <Header />
                        <NavBar />
                        <Favorites 
                            data={favorites}
                            clearFavorites = {clearFavorites}
                        />
                    </div>} 
                />
                </Routes>
            </BrowserRouter>
        </div>    
    )}
export default App;
