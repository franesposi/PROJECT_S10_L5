import React, { useState } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import {
  WiCloud,
  WiDayHaze,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThermometer,
  WiThunderstorm,
} from "weather-icons-react";
import "./CardWeather.css";

import rainImg from "../assets/bg-img/rain.jpeg";
import fogImg from "../assets/bg-img/fog.jpeg";
import clearImg from "../assets/bg-img/clear.jpeg";
import cloudImg from "../assets/bg-img/cloud.jpeg";
import thunderstormImg from "../assets/bg-img/thunderstorm.jpeg";
import snowImg from "../assets/bg-img/snow.jpeg";

const Geolocation = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=247058631abc8b26cb29e1302b4338dc`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
        console.log("dati", data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  const getWeatherBackground = () => {
    const condition = weather.weather[0].main.toLowerCase();
    const backgroundMap = {
      snow: snowImg,
      fog: fogImg,
      rain: rainImg,
      thunderstorm: thunderstormImg,
      clear: clearImg,
      cloud: cloudImg,
      haze: fogImg,
    };
    return backgroundMap[condition] || null;
  };

  return (
    <div>
      <Row className="d-flex justify-content-center text-center">
        <Col xs={4}>
          {isLoading ? <Spinner animation="border" variant="info" className={location ? "d-flex" : "d-none"} /> : null}
          {isError && (
            <Alert variant="danger" className="text-center">
              Errore nel recupero dei dati meteo😥
            </Alert>
          )}
          {!location ? (
            <button
              onClick={handleLocationClick}
              className="text-center bg-white text-black-50 btn"
              style={{ border: "1px solid #8B0000", borderRadius: "0" }}
            >
              PRESS TO START
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          ) : null}
        </Col>
      </Row>
      {weather ? (
        <Container fluid className="mt-5">
          <Row className="d-flex justify-content-center flex-column align-items-center">
            <Col xs={12}>
              <Card
                className="d-flex justify-content-center align-items-center p-3 border-white rounded-2"
                style={{ zIndex: "100" }}
              >
                {getWeatherBackground() && (
                  <img src={getWeatherBackground()} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
                )}
                <h3 className="fw-bold text-white">{weather.name}</h3>
                <h1 className="fw-bold text-white" style={{ fontSize: "55px" }}>
                  {Math.trunc(weather.main.temp)}°
                </h1>
                {weather.weather[0].main.toLowerCase().includes("snow".toLowerCase()) ? (
                  <WiSnow className="text-info" style={{ fontSize: "100px" }} />
                ) : "" || weather.weather[0].main.toLowerCase().includes("fog".toLowerCase()) ? (
                  <WiFog className="text-secondary" style={{ fontSize: "100px" }} />
                ) : "" || weather.weather[0].main.toLowerCase().includes("rain".toLowerCase()) ? (
                  <WiRain className="text-primary" style={{ fontSize: "100px" }} />
                ) : "" || weather.weather[0].main.toLowerCase().includes("clear".toLowerCase()) ? (
                  <WiDaySunny style={{ fontSize: "100px", color: "rgb(255, 212, 102)" }} />
                ) : "" || weather.weather[0].main.toLowerCase().includes("cloud".toLowerCase()) ? (
                  <WiCloud className="text-secondary" style={{ fontSize: "100px" }} />
                ) : "" || weather.weather[0].main.toLowerCase().includes("thunderstorm".toLowerCase()) ? (
                  <WiThunderstorm className="text-black" style={{ fontSize: "100px" }} />
                ) : "" || weather.weather[0].main.toLowerCase().includes("haze".toLowerCase()) ? (
                  <WiDayHaze className="text-secondary" style={{ fontSize: "100px" }} />
                ) : (
                  ""
                )}

                <Card.Body className="border-bottom border-white w-75 text-center text-white fw-bold">
                  <Card.Text>{weather.weather[0].main}</Card.Text>
                </Card.Body>
                <Card.Body className="w-75 text-center text-white">
                  <Row>
                    <Col>
                      <span>
                        Max {Math.trunc(weather.main.temp_max)}°
                        <WiThermometer className="fs-3" />
                      </span>
                    </Col>
                    <Col>
                      <span>
                        Min {Math.trunc(weather.main.temp_min)}° <WiThermometer className="fs-3" />
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default Geolocation;
