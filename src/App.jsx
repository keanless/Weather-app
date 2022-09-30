import "./App.css";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import { useEffect, useState } from "react";
import 'antd/dist/antd.min.css';
import { TextField, Button, Autocomplete } from "@mui/material/";
import { countriesData } from "./countriesData.js";
import Cards from "./components/Cards/Cards";

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [data, getData] = useState([]);
  const [location, getLocation] = useState("49.9089408,49.9089408");
  const findLocation = () => {
    const locationCoord = coords.latitude + "," + coords.longitude;
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: locationCoord,
        days: "3",
        lang: "eng",
      },
      headers: {
        "X-RapidAPI-Key": "13fa833a25msh209e8279f732ea3p1aa471jsn1fba11752653",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        getData([response.data]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: location,
        days: "3",
        lang: "eng",
      },
      headers: {
        "X-RapidAPI-Key": "13fa833a25msh209e8279f732ea3p1aa471jsn1fba11752653",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        getData([response.data]);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  // const searchInput = (e) => {
  //   setInput(e.target.value)
  // }

  return (
    <div className="App">
      <h1 className="header-title"> WEATHER APP </h1>{" "}
      <div className="flex items-center space-x-4 justify-center pt-4">
        <Autocomplete
          disablePortal
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="combo-box-demo"
          options={countriesData}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="Countries" />}
        />{" "}
        <Button variant="contained"> Search </Button>{" "}
        <Button variant="contained" onClick={findLocation}>
          Find my location{" "}
        </Button>{" "}
      </div>{" "}
      <div className="container flex space-x-40 justify-center align-center pt-10">
        {" "}
        {data.map((item, index) => {
          return (
            <div className="flex space-x-4" key={"332"}>
              <Cards
                key={item.current.last_updated_epoch}
                locationName={item.location.name}
                day={"Today"}
                locationRegion={item.location.region}
                locationCountry={item.location.country}
                currentTemp={item.current.temp_c}
                currentIcon={item.current.condition.icon}
                currentConditionText={item.current.condition.text}
                feelsLikeCurrent={item.current.feelslike_c}
                humidityCurrent={item.current.humidity}
                forecastFirstHour={item.forecast.forecastday[0].hour[0].temp_c}
                forecastSecondHour={item.forecast.forecastday[0].hour[6].temp_c}
                forecastThirdHour={item.forecast.forecastday[0].hour[12].temp_c}
                forecastFourHour={item.forecast.forecastday[0].hour[18].temp_c}
                forecastFiveHour={item.forecast.forecastday[0].hour[23].temp_c}
              />{" "}
              <Cards
                key={item.forecast.forecastday[1].data_epoch}
                locationName={item.location.name}
                locationRegion={item.location.region}
                day={"Tomorrow"}
                locationCountry={item.location.country}
                currentTemp={item.forecast.forecastday[1].day.avgtemp_c}
                currentIcon={item.forecast.forecastday[1].day.condition.icon}
                currentConditionText={
                  item.forecast.forecastday[1].day.condition.text
                }
                feelsLikeCurrent={
                  item.forecast.forecastday[1].hour[0].feelslike_c
                }
                humidityCurrent={item.forecast.forecastday[1].day.avghumidity}
                forecastFirstHour={item.forecast.forecastday[1].hour[0].temp_c}
                forecastSecondHour={item.forecast.forecastday[1].hour[6].temp_c}
                forecastThirdHour={item.forecast.forecastday[1].hour[12].temp_c}
                forecastFourHour={item.forecast.forecastday[1].hour[18].temp_c}
                forecastFiveHour={item.forecast.forecastday[1].hour[23].temp_c}
              />{" "}
              <Cards
                key={item.forecast.forecastday[2].data_epoch}
                locationName={item.location.name}
                locationRegion={item.location.region}
                day={"After tomorrow"}
                locationCountry={item.location.country}
                currentTemp={item.forecast.forecastday[2].day.avgtemp_c}
                currentIcon={item.forecast.forecastday[2].day.condition.icon}
                currentConditionText={
                  item.forecast.forecastday[2].day.condition.text
                }
                feelsLikeCurrent={
                  item.forecast.forecastday[2].hour[23].feelslike_c
                }
                humidityCurrent={item.forecast.forecastday[2].day.avghumidity}
                forecastFirstHour={item.forecast.forecastday[2].hour[0].temp_c}
                forecastSecondHour={item.forecast.forecastday[2].hour[6].temp_c}
                forecastThirdHour={item.forecast.forecastday[2].hour[12].temp_c}
                forecastFourHour={item.forecast.forecastday[2].hour[18].temp_c}
                forecastFiveHour={item.forecast.forecastday[2].hour[23].temp_c}
              />{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
}

export default App;
