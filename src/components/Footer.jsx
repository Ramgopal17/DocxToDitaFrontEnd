import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        padding: "16px 0",
        background: "#F8F9FA",
      }}
    >
      <div className="container">
        <span style={{ color: "#000", fontSize: "14px" }}>
          Copyright © 2024 {""}
          <a
            style={{
              textDecoration: "none",
              color: "#71A5CB",
            }}
            href="https://metapercept.com/"
          >
            Metapercept Technology Services LLP
          </a>{" "}
          All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
