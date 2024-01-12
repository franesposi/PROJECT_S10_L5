import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./components/MyNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CardWeather from "./components/CardWeather";
import { Container } from "react-bootstrap";
import Geolocation from "./components/Geolocation";
import MyFooter from "./components/MyFooter";
import PageNotFound from "./components/NotFound";

const App = ({ scroll }) => {
  return (
    <>
      <BrowserRouter>
        <header className={`${scroll > 100 ? "scrolled" : undefined}`}>
          <MyNav />
          <p style={{ marginLeft: "7.5em" }} className="text-black-50">
            Search here you favourite city!
          </p>
        </header>
        <main>
          <Container fluid>
            <Routes>
              <Route element={<Geolocation />} path="/"></Route>
              <Route element={<CardWeather />} path={"/weather"} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </BrowserRouter>
    </>
  );
};

export default App;
