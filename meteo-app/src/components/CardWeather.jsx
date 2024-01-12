import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./CardWeather.css";
import {
  WiCloud,
  WiDayHaze,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiThunderstorm,
} from "weather-icons-react";

import rain from "../assets/bg-img/rain.jpeg";
import fog from "../assets/bg-img/fog.jpeg";
import clear from "../assets/bg-img/clear.jpeg";
import cloud from "../assets/bg-img/cloud.jpeg";
import thunderstorm from "../assets/bg-img/thunderstorm.jpeg";
import snow from "../assets/bg-img/snow.jpeg";
import ForecastWeather from "./ForecastWeather";
import { Water, Wind } from "react-bootstrap-icons";

const CardWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  // console.log(location.search)
  const [weather, setWeather] = useState({
    city: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    description: "",
    condition: "",
    sunrise: "",
    sunset: "",
    data: "",
    humidity: "",
    wind: "",
  });
  console.log(weather);

  const url = `https://api.openweathermap.org/data/2.5/weather/${location.search}&appid=247058631abc8b26cb29e1302b4338dc`;
  const getWeather = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const dataWeather = await res.json();
        console.log(dataWeather);
        setIsLoading(false);
        setWeather({
          city: dataWeather.name,
          temperature: Math.trunc(dataWeather.main.temp),
          maxTemperature: Math.trunc(dataWeather.main.temp_max),
          minTemperature: Math.trunc(dataWeather.main.temp_min),
          description: dataWeather.weather[0].description,
          condition: dataWeather.weather[0].main,
          sunrise: dataWeather.sys.sunrise,
          sunset: dataWeather.sys.sunset,
          data: dataWeather.dt,
          humidity: dataWeather.main.humidity,
          wind: dataWeather.wind.speed * 3.6,
        });
      } else {
        throw new Error("Il clima è tempestoso, non ho trovato nulla!");
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("errore", error);
    }
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = new Date(weather.data * 1000);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();

  const oclock = new Date(weather.sunset * 1000);
  const hour = oclock.getHours();
  const min = oclock.getMinutes();

  const oclock2 = new Date(weather.sunrise * 1000);
  const hour1 = oclock2.getHours();
  const min1 = oclock2.getMinutes();

  return (
    <>
      {isLoading && (
        <div className="text-center mb-2">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      {isError && (
        <Alert variant="danger" className="text-center">
          Errore nel recupero dei dati meteo😥
        </Alert>
      )}
      <Container fluid className="mt-5">
        <Row className="d-flex justify-content-center flex-column align-items-center">
          <Col xs={12}>
            <Card
              className="d-flex justify-content-center align-items-center p-3 border-white rounded-2"
              style={{ zIndex: "100" }}
            >
              {weather.condition.toLowerCase().includes("snow".toLowerCase()) ? (
                <img src={snow} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : "" || weather.condition.toLowerCase().includes("fog".toLowerCase()) ? (
                <img src={fog} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : "" || weather.condition.toLowerCase().includes("rain".toLowerCase()) ? (
                <img src={rain} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : "" || weather.condition.toLowerCase().includes("thunderstorm".toLowerCase()) ? (
                <img src={thunderstorm} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : "" || weather.condition.toLowerCase().includes("clear".toLowerCase()) ? (
                <img src={clear} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : "" || weather.condition.toLowerCase().includes("cloud".toLowerCase()) ? (
                <img src={cloud} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : "" || weather.condition.toLowerCase().includes("haze".toLowerCase()) ? (
                <img src={fog} alt="" className="bgImg rounded-5" style={{ zIndex: "-100" }} />
              ) : (
                ""
              )}
              <h3 className="fw-bold text-white">{weather.city}</h3>
              <p>
                <em className="text-black-50">{`${day} | ${month} | ${year}`}</em>
              </p>
              <h1 className="fw-bold text-white" style={{ fontSize: "55px" }}>
                {weather.temperature}°
              </h1>
              {weather.condition.toLowerCase().includes("snow".toLowerCase()) ? (
                <WiSnow className="text-info" style={{ fontSize: "100px" }} />
              ) : "" || weather.condition.toLowerCase().includes("fog".toLowerCase()) ? (
                <WiFog className="text-secondary" style={{ fontSize: "100px" }} />
              ) : "" || weather.condition.toLowerCase().includes("rain".toLowerCase()) ? (
                <WiRain className="text-primary" style={{ fontSize: "100px" }} />
              ) : "" || weather.condition.toLowerCase().includes("clear".toLowerCase()) ? (
                <WiDaySunny style={{ fontSize: "100px", color: "rgb(255, 212, 102)" }} />
              ) : "" || weather.condition.toLowerCase().includes("cloud".toLowerCase()) ? (
                <WiCloud className="text-secondary" style={{ fontSize: "100px" }} />
              ) : "" || weather.condition.toLowerCase().includes("thunderstorm".toLowerCase()) ? (
                <WiThunderstorm className="text-black" style={{ fontSize: "100px" }} />
              ) : "" || weather.condition.toLowerCase().includes("haze".toLowerCase()) ? (
                <WiDayHaze className="text-secondary" style={{ fontSize: "100px" }} />
              ) : (
                ""
              )}

              <Card.Body className="border-bottom border-white w-75 text-center text-white fw-bold">
                <Card.Text>{weather.condition}</Card.Text>
              </Card.Body>
              <Card.Body className="w-75 text-center text-white">
                <Row>
                  <Col>
                    <span>
                      Max
                      <WiThermometer className="fs-3" />
                      {weather.maxTemperature}°
                    </span>
                  </Col>
                  <Col>
                    <span>
                      Min <WiThermometer className="fs-3" />
                      {weather.minTemperature}°
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-4">
        <Row className="d-flex justify-content-center">
          <Col xs={10} md={7} className="d-flex justify-content-center ">
            <ForecastWeather city={location.search} />
          </Col>
          <Col
            xs={10}
            md={4}
            className="d-flex justify-content-center align-items-center px-2 mt-4 pt-3"
            style={{ border: "1px solid #8B0000", borderRadius: "20px" }}
          >
            <Row>
              <Col>
                <div className="d-flex">
                  <Water className="fs-5 fw-bold" style={{ color: "#8B0000" }} />
                  <p className="d-flex flex-column ms-3">
                    Humidity
                    <span className="fw-bold">{weather.humidity}%</span>
                  </p>
                </div>
                <div className="d-flex">
                  <Wind className="fs-3 fw-bold" style={{ color: "#8B0000" }} />
                  <p className="d-flex flex-column ms-3">
                    Wind
                    <span className="fw-bold">{Math.trunc(weather.wind)} km/h</span>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <WiSunrise className="fs-3 fw-bold" style={{ color: "#8B0000" }} />
                  <p className="d-flex flex-column ms-3">
                    Sunrise
                    <span className="fw-bold">{`${hour1}:${min1}`}</span>
                  </p>
                </div>
                <div className="d-flex">
                  <WiSunset className="fs-3 fw-bold" style={{ color: "#8B0000" }} />
                  <p className="d-flex flex-column ms-3">
                    Sunset
                    <span className="fw-bold">{`${hour}:${min}`}</span>
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CardWeather;
