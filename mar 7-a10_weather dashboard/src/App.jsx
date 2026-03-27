import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('Bangalore')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  function fetchWeather(cityName) {
    setLoading(true)
    setError(null)
    setWeather(null)

    // first get coordinates from city name
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`)
      .then(function(response) {
        return response.json()
      })
      .then(function(geoData) {
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('City not found')
        }
        let place = geoData.results[0]
        // fetch weather using coordinates
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure`)
          .then(function(res) { return res.json() })
          .then(function(weatherData) {
            return { place: place, weather: weatherData }
          })
      })
      .then(function(data) {
        setWeather({
          name: data.place.name,
          country: data.place.country_code,
          temp: Math.round(data.weather.current.temperature_2m),
          feelsLike: Math.round(data.weather.current.apparent_temperature),
          humidity: data.weather.current.relative_humidity_2m,
          wind: data.weather.current.wind_speed_10m,
          pressure: Math.round(data.weather.current.surface_pressure),
          code: data.weather.current.weather_code
        })
        setLoading(false)
      })
      .catch(function(err) {
        setError(err.message)
        setLoading(false)
      })
  }

  function getWeatherDescription(code) {
    if (code === 0) return 'Clear sky'
    if (code <= 3) return 'Partly cloudy'
    if (code <= 49) return 'Foggy'
    if (code <= 59) return 'Drizzle'
    if (code <= 69) return 'Rain'
    if (code <= 79) return 'Snow'
    if (code <= 84) return 'Rain showers'
    if (code <= 94) return 'Thunderstorm'
    return 'Severe weather'
  }

  useEffect(function() {
    fetchWeather(city)
  }, [city])

  function handleSearch(e) {
    e.preventDefault()
    if (searchInput.trim() !== '') {
      setCity(searchInput.trim())
      setSearchInput('')
    }
  }

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search city..."
          value={searchInput}
          onChange={function(e) { setSearchInput(e.target.value) }}
        />
        <button type="submit">Search</button>
      </form>

      <div className="quick-cities">
        <button onClick={function() { setCity('Bangalore') }}>Bangalore</button>
        <button onClick={function() { setCity('Mumbai') }}>Mumbai</button>
        <button onClick={function() { setCity('Delhi') }}>Delhi</button>
        <button onClick={function() { setCity('London') }}>London</button>
      </div>

      {loading && <div className="loading">Loading weather data...</div>}

      {error && <div className="error">Error: {error}</div>}

      {weather && !loading && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.country}</h2>
          <div className="temp">{weather.temp}°C</div>
          <p className="description">{getWeatherDescription(weather.code)}</p>
          <div className="details">
            <div className="detail-item">
              <span>Feels Like</span>
              <strong>{weather.feelsLike}°C</strong>
            </div>
            <div className="detail-item">
              <span>Humidity</span>
              <strong>{weather.humidity}%</strong>
            </div>
            <div className="detail-item">
              <span>Wind</span>
              <strong>{weather.wind} km/h</strong>
            </div>
            <div className="detail-item">
              <span>Pressure</span>
              <strong>{weather.pressure} hPa</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App