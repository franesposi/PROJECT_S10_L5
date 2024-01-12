import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { WiCloud, WiDayHaze, WiDaySunny, WiFog, WiRain, WiSnow, WiThunderstorm } from "weather-icons-react";
import { format, parseISO } from "date-fns";
import "./CardWeather.css";

const ForecastWeather = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/forecast/${city}&appid=247058631abc8b26cb29e1302b4338dc`;

  const getForecast = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setForecast(data.list);
        setIsLoading(false);
      } else {
        throw new Error("Le previsioni future non ci sono!");
      }
    } catch (error) {
      console.log("errore", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
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
      {forecast.slice(0, 5).map((days, i) => {
        const dateString = days.dt_txt;
        const dateObj = parseISO(dateString, "yyy-MM-dd HH:mm:ss", new Date());
        const formatData = format(dateObj, "dd/MM HH:mm");

        const getWeatherIcon = () => {
          const condition = days.weather[0].main.toLowerCase();
          const conditionsMap = {
            snow: <WiSnow className="text-info" style={{ fontSize: "50px" }} />,
            fog: <WiFog className="text-secondary" style={{ fontSize: "50px" }} />,
            rain: <WiRain className="text-primary" style={{ fontSize: "50px" }} />,
            clear: <WiDaySunny style={{ fontSize: "50px", color: "rgb(255, 212, 102)" }} />,
            cloud: <WiCloud className="text-secondary" style={{ fontSize: "50px" }} />,
            thunderstorm: <WiThunderstorm className="text-black" style={{ fontSize: "50px" }} />,
            haze: <WiDayHaze className="text-secondary" style={{ fontSize: "50px" }} />,
          };
          return conditionsMap[condition] || null;
        };

        return (
          <Col
            xs={11}
            md={6}
            className="col-2 d-flex flex-column align-items-center forweather"
            key={i}
            style={{ backgroundColor: "#87B3BA" }}
          >
            <p className="text-center text-white">{formatData}</p>
            {getWeatherIcon()}
            <span className="text-white">{Math.trunc(days.main.temp_min)}°</span>
            <span className="text-white">{Math.trunc(days.main.temp_max)}°</span>
          </Col>
        );
      })}
    </Row>
  );
};

export default ForecastWeather;
