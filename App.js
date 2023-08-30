import React from 'react'
import Header from './Header'
import Main from './Main'
import NavBar from './NavBar'
import Favorites from './Favorites'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

const apiKey = '2e6pcsGJA2sCMvXUcPHOD3ER3RQnKSSa'


class App extends React.Component {
    constructor(){
        super();
        this.state = {
            searchBar: '', 
            cityName: '',
            cityKey : '',
            current: '',
            fiveDay: '',
            favorites: [],
            isFavorite: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this)
        this.fetchCity = this.fetchCity.bind(this)
        this.clearFavorites = this.clearFavorites.bind(this)
    }
    componentDidMount() {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            this.setState({ favorites: JSON.parse(storedFavorites) });
        }

        this.fetchCity('tel aviv', () => {
            if (this.state.favorites.includes(this.state.cityName)) {
                this.setState({ isFavorite: true })
            }
        });
    }
    
    addToFavorites = () => {
        this.setState(
            prevState => {
                const isAlreadyFavorite = prevState.favorites.includes(prevState.cityName);
                let newFavorites;

                if (prevState.isFavorite || isAlreadyFavorite) {
                    newFavorites = prevState.favorites.filter(
                        item => item !== prevState.cityName
                    );
                } else if (isAlreadyFavorite !== true) {
                    newFavorites = [
                        ...prevState.favorites,
                        {
                            cityName: prevState.cityName,
                            weatherIcon: prevState.current.WeatherIcon // Adjust this to the correct path in your API response
                        }
                    ]
                }
                localStorage.setItem('favorites', JSON.stringify(newFavorites))
                return {
                    isFavorite: !prevState.isFavorite,
                    favorites: newFavorites
                };
            }
        );
    };
    fetchCity(location, callback) {
        const bases = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
        const querys = `?apikey=${apiKey}&q=${location} `
        axios.get(bases + querys)
            .then((response)=>{
                
                this.setState({
                searchBar: '',
                cityName: response.data[0].LocalizedName,
                cityKey : response.data[0].Key
                }, ()=>{
                    this.fetchCurrentConditions(this.state.cityKey)
                    this.fetchFiveDay(this.state.cityKey)
                    const isCityFavorite = this.state.favorites.includes(this.state.cityName);
                    this.setState({ isFavorite: isCityFavorite });
                })
                if (callback){
                    callback()
                } 
            })
            .catch(error =>{
                console.error("Couldn't fetch", error)
            })    
    }

    fetchCurrentConditions(key){
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
        const query = `${key}?apikey=${apiKey}`
        axios.get(base+query)
            .then((response)=>{
                this.setState({
                    current: response.data[0]

                })
            })
    }

    fetchFiveDay(key){
        const based = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
        const queryed = `${key}?apikey=${apiKey}&metric=${true}`
        axios.get(based+queryed)
            .then((response)=>{
                this.setState({
                    fiveDay: response.data.DailyForecasts

                })
            })
    }

    handleInputChange(event) {
        this.setState({ searchBar: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.fetchCity(this.state.searchBar);
        
    }
    clearFavorites = () => {
        this.setState({ favorites: [] });
    }
    clearFavorites() {
        this.setState({
            favorites: [],
            isFavorite: false
        });
        localStorage.removeItem('favorites');
    }
    render(){
        return (
            <div>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div><Header /><NavBar />
                        <Main 
                            handleInputChange={this.handleInputChange}
                            handleSubmit={this.handleSubmit}
                            data={this.state}
                        />
    
                        <label 
                            class="checkbox">Favorite
                            <input type="checkbox" 
                            checked={this.state.isFavorite}
                            onChange={this.addToFavorites}
                            />
                            <span class="checkmark"></span>
                        </label>

                    </div>
                }
                    />
                    <Route path="/favorites" element={<div><Header /><NavBar /><Favorites 
                        data={this.state.favorites}
                        clearFavorites = {this.clearFavorites}
                    /></div>} />
                    </Routes>
                </BrowserRouter>
            </div>    
        )}}
export default App;
