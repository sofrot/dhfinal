import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef(null);

  const [nameClass, setNameClass] = useState("");
  const [lastNameClass, setLastNameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [confirmPasswordClass, setConfirmPasswordClass] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user"));

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
  const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
      setNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El nombre debe tener entre 3 y 20 caracteres.
        </div>
      );
    } else if (!value.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)) {
      setNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Nombre no valido
        </div>
      );
    } else {
      setNameClass("");
    }
  };
  const vlastname = (value) => {
    if (value.length < 3 || value.length > 20) {
      setLastNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El apellido debe tener entre 3 y 20 caracteres.
        </div>
      );
    } else if (!value.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)) {
      setLastNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Apellido no valido
        </div>
      );
    } else if (value[0] === " ") {
      setLastNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El apellido no puede empezar con espacio
        </div>
      );
    } 
    else {
      setLastNameClass("");
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
    }else if (!value.match(/^(?!.* )\S/)) {
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
  const vconfirmpassword = (value, props, components) => {
    if (value.length < 6 || value.length > 40) {
      setConfirmPasswordClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La contraseña debe tener entre 6 y 40 caracteres.
        </div>
      );
    }else if (!value.match(/^(?!.* )\S/)) {
      setConfirmPasswordClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La contraseña no puede contener espacios
        </div>
      );
    }
     else {
      setConfirmPasswordClass("");
    }
    if (value !== components["password"][0].value) {
      setPasswordClass("invalid-input");
      setConfirmPasswordClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Las contraseñas deben ser iguales.
        </div>
      );
    } else {
      setPasswordClass("");
      setConfirmPasswordClass("");
    }
  };

  const checkBtn = useRef(null);
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, lastName, email, password).then(
        (response) => {
          Swal.fire({
            title: "Se envio un mail para validar su correo electrónico",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: `<a href="mailto:${email}">Ir a mi correo</a>`,
            focusConfirm: false,
          }).then((result) => {
              setSuccessful(true);
              navigate("/login");           
          });
        },
        (error) => {
          // Mensaja mas personalizado
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
          // setMessage(resMessage);
          if (error.response.status !== 201) {
            setMessage(
              "Lamentablemente no ha podido registrarse. Por favor, intente más tarde"
            );
          } else {
            setMessage("");
          }
          setSuccessful(false);
        }
      );
    }
  };
  function capitalizarPrimeraLetra(e) {
    const miOracion = e.target.value;
    const palabras = miOracion.split(" ");
    if (!e.target.value) return;
    for (let i = 0; i < palabras.length; i++) {
      if(palabras[i][0]){
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
      }
    }
    e.target.value = palabras.join(" ");
  }
  const showPassword = useRef(null);
  const hidePassword = useRef(null);
  const [togglePassword, setTogglePassword] = useState("password");
  return (
    <div className="containerFormRegister">
      {message && (
        <div className="container-message">
          <div
            className={
              successful
                ? "alert alert-success"
                : "alert alert-danger submit-message"
            }
            role="alert"
          >
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>{message}</p>
          </div>
        </div>
      )}
      <h3>Crear cuenta</h3>
      <div>
        <Form ref={form}>
          {!successful && (
            <div className="formFlex">
              <div className="fullName">
                <div className="inputLabel">
                  <label htmlFor="name">Nombre</label>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onKeyDown={capitalizarPrimeraLetra}
                    onChange={onChangeName}
                    validations={[required, vname]}
                    className={nameClass}
                  />
                </div>
                <div className="inputLabel">
                  <label htmlFor="lastName">Apellido</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onKeyDown={capitalizarPrimeraLetra}
                    onChange={onChangeLastName}
                    validations={[required, vlastname]}
                    className={lastNameClass}
                  />
                </div>
              </div>
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
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                  className={passwordClass}
                />
              </div>
              <div className="inputLabel">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <Input
                  type={togglePassword}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required, vconfirmpassword]}
                  className={confirmPasswordClass}
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
                <button type="submit" onClick={handleRegister}>
                  Crear cuenta
                </button>
                <p>
                  ¿Ya tienes una cuenta?<Link to="/login"> Iniciar sesión</Link>
                </p>
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}
