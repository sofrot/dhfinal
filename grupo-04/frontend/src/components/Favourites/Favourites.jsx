import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Map from "../Map/Map";
import "./favouritesStyle.css";
import jwt from "jwt-decode";
import MapWithMarkers from "./Map/MapWithMarkers";
import FavouriteCard from "./FavouriteCard";

export default function Favourites(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(true);
  const [productAddress, setProductAddress] = useState(false);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? jwt(localStorage.getItem("user")).user : ""
  );
  const [click, setClick] = useState(false);
  useEffect(() => {
    fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/user/favorites/${user.email}`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        let newArray = [];
        for(let i=0; i<data.length;i++){
          if(data[i].active){
            newArray.push(data[i]);
          }
        }
        setData(newArray);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
  }, []);
  return (
    <section className="my-favourites-view">
      {!isLoading ? (
        <>
          <div className="top-container">
            <div className="top">
              <div className="admin-title">
              <h4>Perfil</h4>
                <h2>Mis favoritos</h2>
              </div>
              <div className="back-home">
                <Link to={"/"}>
                  <i className="fa-solid fa-chevron-left"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="main-container">
            <div className="render-container" style={data.length === 0?{overflow:"hidden"}:{overflow:"auto"}}>
              {data.length === 0 ? (
                <section className="product-not-found">
                  <h1>¡Upss! Lo sentimos mucho,</h1>
                  <img
                    className="not-found-GIF"
                    src="https://c.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
                    alt="Lost"
                  />
                  <h1>usted no posee productos favoritos 💔</h1>
                  <div className="button-home">
                    <button>
                      <Link to={"/"} className="link_404">
                        <p>Volver al inicio</p>
                      </Link>
                    </button>
                  </div>
                </section>
              ) : (
                <>
                  {data.map((item, index) => {
                    return (
                      <div key={index + ":" + item.title}>
                        <FavouriteCard
                          click={click}
                          setClick={setClick}
                          cardInfo={item}
                          address={setProductAddress}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="map-container">
              <MapWithMarkers
                height="100%"
                width="100%"
                borderRadius="none"
                boxShadow="none"
                address={productAddress}
                clickShowLocation={click}
                data={data}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="booking-loading">
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/4400319/loading_crescor_dribbble.gif"
            alt="CategoryLoader"
          />
        </div>
      )}
    </section>
  );
}
