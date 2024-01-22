import { useState } from "react";

const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "495af0ca45ff4655c64c67c97878a976";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ha ocurrido un problema: ", error);
    }
  };

  return (
    <div className="container">
      <h1>App de clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>

      {dataClima && (
        <div className="container">
          <h2>{dataClima.name}</h2>
          <h3>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</h3>
          <h3>Condición meteorológica:</h3>
          <h1>{dataClima.weather[0].description}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
