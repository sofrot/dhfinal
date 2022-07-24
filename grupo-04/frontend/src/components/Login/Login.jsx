import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { isEmail } from "validator";

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef(null);
  const checkBtn = useRef(null);
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const location = useLocation();
  const { bookingMessage } = location.state ? location.state : false;
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (bookingMessage) {
      setMessage(bookingMessage);
    }
  }, [navigate]);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es obligatorio!
        </div>
      );
    }
  };
  const vemail = (value) => {
    if (
      !isEmail(value) ||
      !value.match(
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
      )
    ) {
      setEmailClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Email no valido.
        </div>
      );
    } else {
      setEmailClass("");
    }
  };
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      setPasswordClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La contraseña debe tener entre 6 y 40 caracteres.
        </div>
      );
    } else if (!value.match(/^(?!.* )\S/)) {
      setPasswordClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La contraseña no puede contener espacios
        </div>
      );
    } else {
      setPasswordClass("");
    }
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          props.changeIsUser(true);
          navigate("/");
        },
        (error) => {
          // Mensaje mas personalizado
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
          // setMessage(resMessage);
          if (error.response.status !== 200) {
            setMessage(
              "Lamentablemente no ha podido inicar sesión. Por favor, intente más tarde"
            );
          } else {
            setMessage("");
          }
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };
  const showPassword = useRef(null);
  const hidePassword = useRef(null);
  const [togglePassword, setTogglePassword] = useState("password");
  return (
    <div className="containerFormLogin">
      {message && (
        <div className="container-message">
          <div className="submit-message" role="alert">
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>{message}</p>
          </div>
        </div>
      )}
      <h3>Iniciar sesión</h3>
      <div>
        <Form ref={form} className="formFlex">
          <div className="inputLabel">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, vemail]}
              className={emailClass}
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="password">Contraseña</label>
            <Input
              type={togglePassword}
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required, vpassword]}
              className={passwordClass}
            />
            <i
              className="fa-solid fa-eye-slash showPassword"
              style={{ display: "block"}}
              onClick={() => {
                showPassword.current.style.display = "none";
                hidePassword.current.style.display = "block";
                setTogglePassword("text");
              }}
              ref={showPassword}
            ></i>
            <i
              className="fa-solid fa-eye hidePassword"
              style={{ display: "none" }}
              onClick={() => {
                hidePassword.current.style.display = "none";
                showPassword.current.style.display = "block";
                setTogglePassword("password");
              }}
              ref={hidePassword}
            ></i>
          </div>
          <div className="inputLabel boton">
            <button type="submit" disabled={loading} onClick={handleLogin}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Ingresar</span>
            </button>
            <p>
              ¿Aún no tenés cuenta?<Link to="/register"> Registrate</Link>
            </p>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}
