import React from "react";
import "./Cards.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Cards({
 ...props
}) {
  return (
    <div>
      <div className="card-1">
        <h2>
          {props.locationRegion}/{props.locationName}
        </h2>
        <h3>{props.locationCountry}</h3>
        <h4>{props.currentTemp} °C </h4>
        <img
          src={props.currentIcon}
          alt={props.currentConditionText}
          className="weather-card-img"
        />
        <span>{props.currentConditionText} </span>
        <p>
          Feels like : {props.feelsLikeCurrent} °C Humidty : {props.humidityCurrent} %
        </p>
        <Splide aria-label="Weather info for today">
          <SplideSlide>{props.forecastFirstHour} °C  <br/>00:00</SplideSlide>
          <SplideSlide>{props.forecastSecondHour} °C  <br/>06:00</SplideSlide>
          <SplideSlide>{props.forecastThirdHour} °C  <br/>12:00</SplideSlide>
          <SplideSlide>{props.forecastFourHour} °C  <br/>18:00</SplideSlide>
          <SplideSlide>{props.forecastFiveHour} °C  <br/>24:00</SplideSlide>
        </Splide>
      </div>
    </div>
  );
}

export default Cards;
