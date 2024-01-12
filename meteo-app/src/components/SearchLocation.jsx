import { useEffect, useState } from "react";
import { Col, Form, FormControl, InputGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchLocation = () => {
  const [dataCity, setDataCity] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getLocation = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=${2}&APPID=247058631abc8b26cb29e1302b4338dc`
      );
      if (res.ok) {
        const dataLocation = await res.json();
        console.log("dati1", dataLocation);
        setDataCity(dataLocation);
      } else {
        throw new Error("Errore nel trovare il luogo");
      }
    } catch (error) {
      console.log("errore", error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      getLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <Col xs={10} md={8} className="d-flex justify-content-center align-items center" style={{ width: "250px" }}>
        <Form className="d-flex flex-column">
          <InputGroup className="d-flex flex-row">
            <FormControl
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ border: "1px solid #3498db", borderRadius: "0" }}
              aria-label="Search city..."
            />
          </InputGroup>

          {dataCity
            .filter((city) => city.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((city, i) => (
              <ListGroupItem key={i} className={`${!searchValue ? "d-none" : "d-block"}`}>
                <Link
                  to={`/weather?lat=${city.lat}&lon=${city.lon}`}
                  className="d-flex justify-content-between link text-black"
                  style={{ textDecoration: "none" }}
                >
                  <div className="ps-2 w-100">
                    <span>{searchValue ? city.name : ""}</span>
                    <span>{searchValue ? city.country : ""}</span>
                  </div>
                </Link>
              </ListGroupItem>
            ))}
        </Form>
      </Col>
    </>
  );
};

export default SearchLocation;
