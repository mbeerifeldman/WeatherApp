import React, { useEffect } from 'react'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { setFavorites, setSearch, setName, setKey, setCurrent, setFive } from './redux/actions'
import Header from './Header'
import Main from './Main'
import NavBar from './NavBar'
import Favorites from './Favorites'
import GMaps from './GMaps'
import  API  from './API'
import store from './redux/configureStore'

function App() {
    const isFavorite = useSelector((state) => state.isFavorite.isFavorite)
    const error = useSelector((state) => state.isFavorite.error)
    const favorites = useSelector((state) => state.favorites.favorites)
    const searchBar = useSelector((state) => state.fetch.searcBar)
    const cityName = useSelector((state) => state.fetch.cityName)
    const current = useSelector((state) => state.fetch.current)
    const cityKey = useSelector((state) => state.fetch.cityKey)
    const fiveDay = useSelector((state) => state.fetch.fiveDay)
    
    const dispatch = useDispatch()
    let newFavorites
    const {
        fetchCity,
        fetchCurrentConditions,
        fetchFiveDay,
      } = API()

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
        dispatch(setFavorites(newFavorites))
    }

    const handleInputChange = (event) => {
        dispatch(setSearch(event.target.value))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const submittedCity = searchBar
          const cityInfo = await fetchCity(submittedCity);
          dispatch(setName(cityInfo.LocalizedName))
          dispatch(setKey(cityInfo.Key))
          const currentConditions = await fetchCurrentConditions(cityInfo.Key);
          dispatch(setCurrent(currentConditions))
          const fiveDay = await fetchFiveDay(cityInfo.Key);
          dispatch(setFive(fiveDay))
      }

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
                    {error && <p>Error: An error occurred while fetching data.</p>}
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
                            {error && <p>Error: An error occurred while fetching data.</p>}
                        </div>
                    }
                /> 
            </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

