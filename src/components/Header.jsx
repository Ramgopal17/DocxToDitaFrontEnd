import React, { useEffect } from "react";
import logo from "../assets/MetR_Logo.svg";
import logout from "../assets/logout.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isToken, setIsToken] = React.useState(false);

  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    setIsToken(localStorage.getItem("token") || null);
  }, [location.pathname]);
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.178)",
      }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="" />
          <span className="ms-3">Docx to DITA Migration</span>
        </a>
        {isToken && (
          <button
            onClick={logoutHandler}
            style={{
              outline: "none",
              border: "none",
              background: "transparent",
            }}
          >
            <img
              style={{
                width: "15px",
                height: "15px",
                marginRight: "5px",
              }}
              src={logout}
              alt="logout"
            />
            Logout
          </button>
        )}
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/package.json"
              >
                Home
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Header;
