import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./logged.css";
import "../Header/Header.css";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";


export default function Logged(props) {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? AuthService.getCurrentUser() : ""
  );
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");

  const [isFirstRender, setFirstRender] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (isFirstRender) {
      setFirstRender(false);
    }
    setName(user.name);
    setLastName(user.lastName);
    setInitials(
      name.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
    );
  }, [user, name, isFirstRender, lastName]);

  function unlogAndRedirect() {
    Swal.fire({
      title: "Deseas cerrar sesion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, quiero cerrar sesion!",
    }).then((result) => {
      if (result.isConfirmed) {
        AuthService.logout();
        navigate("/login");
        Swal.fire("Sesion cerrada correctamente!");
      }
    });
  }

  const dropdown = useRef(null);

  //{isAdmin && <Link to="/administracion" title="Panel de administración" aria-label="Administration panel"><FaUserCog alt="Ícono panel de administración" className="admin-icon" /></Link>}
  return (
    <div className="user-header-container">
      <div
        className="welcome-user-mobile"
      >
        <div className="avatar">
          <span className="avatar-letters">{initials}</span>
        </div>
        <div className="greeting">
          <p>Hola,</p>
          <p className="full-name">
            {name} {lastName}
          </p>
        </div>
      </div>
      <div
        className="welcome-user"
        onClick={() =>
          dropdown.current.style.display === "none"
            ? (dropdown.current.style.display = "block")
            : (dropdown.current.style.display = "none")
        }
      >
        <div className="avatar">
          <span className="avatar-letters">{initials}</span>
        </div>
        <div className="greeting">
          <p>Hola,</p>
          <p className="full-name">
            {name} {lastName}
          </p>
        </div>
      </div>
      <div className="user-dropdown" style={{ display: "none" }} ref={dropdown}>
        <div className="options">
          <Link to={"/user/favourites"} >
            <div className="option" onClick={() => dropdown.current.style.display = "none"}>
              <i className="fa-solid fa-heart"></i>
              <h4>Mis favoritos</h4>
            </div>
          </Link>
          <Link to={"/user/bookings"} >
          <div className="option" onClick={() => dropdown.current.style.display = "none"}>
            <i className="fa-solid fa-house"></i>
            <h4>Mis reservas</h4>
          </div>
          </Link>
          
          <div className="option">
            <i className="fa-solid fa-screwdriver-wrench"></i>
            <h4>Configuracion</h4>
          </div>
          <div className="option" onClick={unlogAndRedirect}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <h4>Cerrar sesion</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
