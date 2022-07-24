import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingCard from "./BookingCard/BookingCard";
import "./userBookings.css";
import url from "../../url.json";
import jwt from "jwt-decode";
const UserBookings = (props) => {
  const [fetchData, setFetchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? jwt(localStorage.getItem("user")).user : ""
  );
  useEffect(() => {
    //${props.userData.user.id}
    if (props.userData && !fetchData) {
      fetch(`${url.api}/api/reservation/findAll/user/${user.id}`)
        .then((response) => {
          if (!response.ok) throw Error(response.status);
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          setFetchData(data);
          setIsLoading(false);
        });
    }
    if (fetchData) {
    }
  }, [fetchData, isLoading, props.userData]);

  return (
    <div className="userbookings-super-container">
      {!isLoading ? (
        <div>
          {fetchData.length !== 0 ? (
            <div>
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
              <div className="user-bookings-container">
                <div className="user-bookings-cards-container user-bookings-item">
                  {fetchData.map((element, index) => {
                    return (
                      <BookingCard
                        data={element}
                        index={index}
                        key={element.id + index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="bookings-title">Mis Reservas</h2>
              <div className="user-bookings-container">
                <h2>No tienes reservas hechas aún</h2>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="booking-loading">
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/4400319/loading_crescor_dribbble.gif"
            alt="CategoryLoader"
          />
        </div>
      )}
    </div>
  );
};

export default UserBookings;
