import { Link, Outlet } from "react-router-dom";

export default () => {
  return (
    <>
      <div className="main">
        <h1>
          <Link to={"/"}>LAAS</Link>
        </h1>
        <Outlet />
      </div>
    </>
  );
};
