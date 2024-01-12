import { Link } from "react-router-dom";
import svg from "../assets/404.svg";

const PageNotFound = () => {
  return (
    <>
      <div className="cont-404">
        <img src={svg} alt="svg" />
        <Link to={"/"}>
          <button>Back to Home</button>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
