import { React, useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logged from "../Login/Logged";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";
import jwt from "jwt-decode";
import { useContext } from "react";

export default function Header(props) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const mySidenav = useRef(null);
  const content = useRef(null);
  const bg = useRef(null);

  useEffect(() => {
    if (props.isUser) {
      setUser(AuthService.getCurrentUser());
      if (localStorage.getItem("user")) {
        AuthService.getCurrentUser().roles[0].name === "ROLE_ADMIN"
          ? setIsAdmin(true)
          : setIsAdmin(false);
      }
    } else {
      setUser(null);
    }
    /*
    return (() => {
      if (!user) {
        setUser(AuthService.getCurrentUser())
      }
    }
    )*/
  }, [navigate, props.isUser, isAdmin]);

  function openNav() {
    mySidenav.current.style.width = "100%";
    content.current.style.width = "100%";
    bg.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    document.body.removeAttribute("style");
    content.current.style.width = "0";
    bg.current.style.backgroundColor = "";
    setTimeout(function () {
      mySidenav.current.style.width = "0";
    }, 500);
  }

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
        props.changeIsUser(false);
        setUser(null);
        closeNav();
        navigate("/login");
        Swal.fire("Sesion cerrada correctamente!");
      }
    });
  }

  return (
    <header data-testid="header1">
      <div className="sidenav" ref={mySidenav}>
        <div className="side">
          <div className="bg" ref={bg} onClick={closeNav}></div>
          <div className="content" ref={content}>
            {user ? (
              <>
                <div className="top">
                  <p className="closebtn" onClick={closeNav}>
                    &times;
                  </p>
                  <Logged />
                </div>
                  <div className="admin-info-mobile">
                  {isAdmin && (
                    <Link to={"/admin/createProduct"} onClick={()=>closeNav()}>
                        <div className="option">
                          <span>Administración</span>
                        </div>
                      </Link>)}
                      <Link to={"/user/favourites"} onClick={()=>closeNav()}>
                        <div className="option">                         
                          <span>Mis favoritos</span>
                        </div>
                      </Link>
                      <Link to={"/user/bookings"} onClick={()=>closeNav()}>
                      <div className="option">
                        <span>Mis reservas</span>
                      </div>
                      </Link>
                      <Link to={"/"} onClick={()=>closeNav()}>
                      <div className="option">                     
                        <span>Configuracion</span>
                      </div> 
                      </Link>                    
                    <hr />
                  </div>
                <div className="logout">
                  <p>
                    ¿Deseas{" "}
                    <span onClick={unlogAndRedirect}>cerrar sesión</span>?{" "}
                  </p>
                  <hr />
                </div>
              </>
            ) : (
              <>
                <div className="top">
                  <p className="closebtn" onClick={closeNav}>
                    &times;
                  </p>
                  <Link to={"/"} className="home" onClick={closeNav}>
                    <p className="menu">Menu</p>
                  </Link>
                </div>
                {(location.pathname === "/" ||
                  // Obtengo solamente "/product" utilizando un slice
                  location.pathname.slice(0, 8) === "/product") && (
                  <div className="sub">
                    <Link to={"/register"} className="home" onClick={closeNav}>
                      <p>Crear cuenta</p>
                    </Link>
                    <hr />
                    <Link to={"/login"} className="home" onClick={closeNav}>
                      <p>Iniciar sesion</p>
                    </Link>
                  </div>
                )}
                {location.pathname === "/login" && (
                  <div className="sub">
                    <Link to={"/register"} className="home" onClick={closeNav}>
                      <p>Crear cuenta</p>
                      <hr style={{ backgroundColor: "white" }} />
                    </Link>
                  </div>
                )}
                {location.pathname === "/register" && (
                  <div className="sub">
                    <Link to={"/login"} className="home" onClick={closeNav}>
                      <p>Iniciar sesion</p>
                      <hr style={{ backgroundColor: "white" }} />
                    </Link>
                  </div>
                )}
                {location.pathname === "/logged" && (
                  <div className="sub">
                    <Logged />
                  </div>
                )}
              </>
            )}
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
        </div>
      </div>
      <div className="container">
        <Link className="title" to={"/"}>
          <img src={require("../../img/Logo.png")} alt="Logo" className="logo"/>
          <h2>
            <i>Sentite como en tu hogar</i>
          </h2>
        </Link>
        {user ? (
          <div className="user">
            {isAdmin && (
              <div className="admin-info">
                <Link to={"/admin/createProduct"} onClick={closeNav}>
                  <span>Administración</span>
                </Link>
                <hr />
              </div>
            )}
            <div className="logged">
              <Logged />
            </div>
            <i className="fa-solid fa-bars menu" onClick={openNav}></i>
          </div>
        ) : (
          <>
            {(location.pathname === "/" ||
              // Obtengo solamente "/product" utilizando un slice
              location.pathname.slice(0, 8) === "/product") && (
              <div className="user">
                <Link className="signin" to={"/register"}>
                  <h2>Crear cuenta</h2>
                </Link>{" "}
                <Link className="login" to={"/login"}>
                  <h2>Iniciar sesion</h2>
                </Link>
                <i className="fa-solid fa-bars menu" onClick={openNav}></i>
              </div>
            )}
            {location.pathname === "/login" && (
              <div className="user">
                <Link className="signin" to={"/register"}>
                  <h2>Crear cuenta</h2>
                </Link>
                <i className="fa-solid fa-bars menu" onClick={openNav}></i>
              </div>
            )}
            {location.pathname === "/register" && (
              <div className="user">
                <Link className="login" to={"/login"}>
                  <h2>Iniciar sesion</h2>
                </Link>
                <i className="fa-solid fa-bars menu" onClick={openNav}></i>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
