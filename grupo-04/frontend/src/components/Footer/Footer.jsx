import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container" data-testid= "footer1">
        <div className="copyright">
          <p>©2021 Digital Booking</p>
        </div>
        <div className="social">
          <a href="">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
