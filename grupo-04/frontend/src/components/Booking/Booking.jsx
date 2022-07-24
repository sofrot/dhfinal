import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "./booking.css";
import "../Product/product.css";
import Swal from "sweetalert2";
import jwt from "jwt-decode";
import Schedule from "./Schedule/Schedule";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";

const Booking = (props) => {
  const { idProduct } = useParams();
  const [isFirstRender, setFirstRender] = useState(true);
  const [arrivalHour, setArrivalHour] = useState(false);
  const [data, setData] = useState();
  const [checkIn, setCheckIn] = useState({
    formated: "__ /__ /____",
    raw: false,
  });
  const [checkOut, setCheckOut] = useState({
    formated: "__ /__ /____",
    raw: false,
  });
  const [disabledDates, setDisabledDates] = useState();
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? jwt(localStorage.getItem("user")).user
      : false
  );
  const rules = !data ? ["Cargando..."] : data.policies[0].rules.split(".");
  const health = !data ? ["Cargando..."] : data.policies[0].health.split(".");
  const location = useLocation();
  const bookingContainerRef = useRef(null);
  const navigate = useNavigate();

  const [inputName, setInputName] = useState(user ? user.name : "");
  const [inputLastName, setInputLastName] = useState(user ? user.lastName : "");
  const [inputEmail, setInputEmail] = useState(user ? user.email : "");
  const [nameClass, setNameClass] = useState("");
  const [lastNameClass, setLastNameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [validateName, setValidateName] = useState(false);
  const [validateLastName, setValidateLastName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [alertDate, setAlertDate] = useState("");
  const [alertArrival, setAlertArrival] = useState("");
  const [messageArrival, setMessageArrival] = useState(false);
  const [activeDate, setActiveDate] = useState({ current: new Date() })
  const [inputPhone, setInputPhone] = useState("");
  const [inputDatosAd, setInputDatosAd] = useState("");
  const [calendarValue, setCalendarValue] = useState('');
  const [preventCovid, setPreventCovid] = useState(false);
  const [optionsActive, setOptionsActive] = useState({ class: '', active: false })
  const form = useRef(null);
  const checkBtn = useRef(null);
  const prevCalendarValue = useLocation();
  useEffect(() => {
    if (prevCalendarValue.state.cValue) {
      setCalendarValue(prevCalendarValue.state.cValue)
      setCheckIn({
        formated: prevCalendarValue.state.cValue[0].toLocaleString("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        raw: prevCalendarValue.state.cValue[0].toISOString().slice(0, 10),
      });
      setCheckOut({
        formated: prevCalendarValue.state.cValue[1].toLocaleString("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        raw: prevCalendarValue.state.cValue[1].toISOString().slice(0, 10),
      });
    }
  }, [prevCalendarValue])
  useEffect(() => {
    if (isFirstRender) {
      if (user) {
        fetch(
          `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/product/${idProduct}`
        )
          .then((response) => {
            if (!response.ok) throw Error(response.status);
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setDisabledDates(data.reservations);
          })
          .catch((error) => {
            navigate(`/product/${idProduct}/NotFound`);
          });
        setFirstRender(false);
        return;
      } else {
        navigate("/");
      }
    }
  }, [isFirstRender, data, navigate, optionsActive, checkIn,checkOut]);

  const selectArrivalHour = (e) => {
    setArrivalHour(e);
    if (arrivalHour) {
      setAlertArrival("");
      setMessageArrival(false)
    }
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    return dateArray;
  }
  const getDisabledDate = () => {
    return disabledDates.map((e) => {
      return getDates(
        new Date(addDays(e.checkIn, 1)),
        new Date(addDays(e.checkOut, 1))
      );
    });
  };
  const simplifyArray = (arr) => {
    let disabledDatesNewArr = []
    arr.forEach(element => {
      disabledDatesNewArr = disabledDatesNewArr.concat(element)
    })
    return disabledDatesNewArr
  }
  const dateHandler = (e) => {

    if (!checkIn.raw || !checkOut.raw) {
      setAlertDate("");
      messageCalendar.current.style.display = "none"
    }
    const selectedDaysArr = getDates(e[0], e[1])
    const disabledDatesArr = getDisabledDate()
    const disabledDatesNewArray = simplifyArray(disabledDatesArr)
    let isMatch = false;
    for (let i = 0; i < selectedDaysArr.length; i++) {
      const element = selectedDaysArr[i];
      for (let j = 0; j < disabledDatesNewArray.length; j++) {
        const element2 = disabledDatesNewArray[j];
        if (element.getDate() == element2.getDate() && element.getMonth() == element2.getMonth() && element.getFullYear() == element2.getFullYear()) {
          isMatch = true;

        }
      }
    }
    if (isMatch) {
      setCalendarValue(null)
      setCheckIn({ formated: '__/__/____' })
      setCheckOut({ formated: '__/__/____' })
    } else {

      setCalendarValue()
      setCheckIn({
        formated: e[0].toLocaleString("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        raw: e[0].toISOString().slice(0, 10),
      });
      setCheckOut({
        formated: e[1].toLocaleString("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        raw: e[1].toISOString().slice(0, 10),
      });
    }
  };
  const reservarProducto = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + AuthService.getCurrentUser().jwt
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      arrival: arrivalHour,
      checkIn: checkIn.raw,
      checkOut: checkOut.raw,
      product: {
        id: parseInt(idProduct),
      },
      user: {
        id: user.id
      },
      addressee: {
        name: inputName,
        lastName: inputLastName,
        email: inputEmail,
        phone: inputPhone,
        data: inputDatosAd,
        vaccinated: preventCovid
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/reservation/create",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => { })
      .catch((error) => { });
  };
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
      setValidateEmail(false)
      setEmailClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Email no valido.
        </div>
      );
    } else {
      setValidateEmail(true)
      setEmailClass("");
    }
  };
  const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
      setValidateName(false)
      setNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El nombre debe tener entre 3 y 20 caracteres.
        </div>
      );
    } else if (!value.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)) {
      setValidateName(false)
      setNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Nombre no valido
        </div>
      );
    } else {
      setValidateName(true)
      setNameClass("");
    }
  };
  const vlastname = (value) => {
    if (value.length < 3 || value.length > 20) {
      setValidateLastName(false)
      setLastNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El apellido debe tener entre 3 y 20 caracteres.
        </div>
      );
    } else if (!value.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)) {
      setValidateLastName(false)
      setLastNameClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          Apellido no valido
        </div>
      );
    } else {
      setValidateLastName(true)
      setLastNameClass("");
    }
  };
  const changeInputName = (e) => {
    setInputName(e.target.value);
  };
  const changeInputLastName = (e) => {
    setInputLastName(e.target.value);
  };
  const changeInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const changeInputPhone = (e) => {
    const regexn = /^\d+$/;
    if (regexn.test(e.target.value) || e.target.value === "") {
      setInputPhone(e.target.value);
    }
  }

  const changeInputDatosAd = (e) => {
    setInputDatosAd(e.target.value);
  }

  const messageCalendar = useRef(null)

  const confirmBooking = () => {
    form.current.validateAll();
    if (arrivalHour && checkIn.raw && checkOut.raw && validateName && validateLastName && validateEmail) {
      Swal.fire({
        title: "Deseas confirmar la reserva?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, deseo confirmar la reserva!",
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          reservarProducto();
          Swal.fire({
            title: "¡Muchas gracias!",
            text: "Su reserva se ha realizado con éxito",
            icon: "success",
            confirmButtonColor: "lightslategrey",
            confirmButtonText: "Volver al inicio",
            focusConfirm: false,
          }).then((result) => {
            navigate("/");
          });
        }
      });
    }
    if (!arrivalHour) {
      setAlertArrival("arrivalAlert");
      setMessageArrival("Seleccione una hora valida")
    }
    if (!checkIn.raw) {
      setAlertDate("dateAlert");
      messageCalendar.current.style.display = "block"
    }
    if (!checkOut.raw) {
      setAlertDate("dateAlert");
      messageCalendar.current.style.display = "block"
    }
  };

  function capitalizarPrimeraLetra(e) {
    const miOracion = e.target.value;
    const palabras = miOracion.split(" ");
    if (!e.target.value) return;
    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i][0]) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
      }
    }
    e.target.value = palabras.join(" ");
  }

  const checkBoxClick = () => {
    if (preventCovid) {
      setPreventCovid(false);
    } else {
      setPreventCovid(true);
    }
  }

  const handleExitEvent = (e) => {
    if (!optionsActive.active && !e.target.classList.contains('booking-schedule-select')) {
      setOptionsActive({ class: '', active: false })
    }
  }

  useEffect(() => {

  }, [activeDate, calendarValue, optionsActive])
  return (
    <div>
      {data ? (
        <div className="super-container-booking" ref={bookingContainerRef} onClick={handleExitEvent}>
          <div className="top-container-booking">
            <div className="top-booking">
              <div className="product-title-booking">
                <h4>{data.category.title}</h4>
                <h2>{data.title}</h2>
              </div>
              <div className="back-home-booking">
                <Link to={location.pathname.slice(0, -8)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </Link>
              </div>
            </div>
          </div>
          <h2 className="complete-data">Completá tus datos</h2>
          <div className="main-container-booking">
            <div className="booking-left-container">
              <Form ref={form}>
                <div className="booking-data-container">

                  <div className="booking-data-input sub-container">
                    <label htmlFor="name">Nombre</label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={inputName}
                      onKeyDown={capitalizarPrimeraLetra}
                      onChange={changeInputName}
                      validations={[required, vname]}
                      className={`input-booking ${nameClass}`}
                    />
                  </div>
                  <div className="booking-data-input sub-container">
                    <label htmlFor="lastName">Apellido</label>
                    <Input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={inputLastName}
                      onKeyDown={capitalizarPrimeraLetra}
                      onChange={changeInputLastName}
                      validations={[required, vlastname]}
                      className={`input-booking ${lastNameClass}`}
                    />
                  </div>
                  <div className="booking-data-input sub-container">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="text"
                      name="email"
                      value={inputEmail}
                      onChange={changeInputEmail}
                      validations={[required, vemail]}
                      className={`input-booking ${emailClass}`}
                    />
                  </div>
                  <div className="booking-data-input sub-container">
                    <label htmlFor="phone">Celular</label>
                    <Input
                      id="phone"
                      type="text"
                      name="phone"
                      value={inputPhone}
                      onChange={changeInputPhone}
                      className={`input-booking`}
                      placeholder="Ingrese un celular de contacto"
                    />
                  </div>

                  <div className="booking-data-textarea datos-adicionales">
                    <label htmlFor="datos">Datos Adicionales</label>
                    <textarea id="datos" name="datos" className="textarea-booking" value={inputDatosAd} onChange={changeInputDatosAd} cols="30" rows="10" placeholder="Complete con información que considere importate saber"></textarea>
                  </div>
                  <div className="booking-data-covid covid">
                    <i className={preventCovid ? "fa-regular fa-square-check" : "fa-regular fa-square"} onClick={checkBoxClick}></i>
                    <label htmlFor="covid" onClick={checkBoxClick}> Vacunado contra el COVID 19</label>
                  </div>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
              <div className="calendar-container">
                <h2>Selecciona tu fecha de reserva</h2>
                <div className="desktop-container">
                  <div
                    className={`calendar-mobile calendar-desktop ${alertDate}`}
                  >
                    <span className="calendar-alert" ref={messageCalendar}>Seleccione una fecha valida</span>
                    <Calendar
                      allowPartialRange={false}
                      activeStartDate={activeDate.current}
                      onChange={dateHandler}
                      selectRange={true}
                      minDate={new Date()}
                      returnValue={"range"}
                      navigationLabel={({ date }) =>
                        date
                          .toLocaleString("es-ES", {
                            year: "numeric",
                            month: "long",
                          })
                          .toUpperCase()
                          .split("DE")
                      }
                      value={calendarValue}
                      navigationButton={true}
                      next2Label={null}
                      showDoubleView={window.innerWidth >= 768 ? true : false}
                      locale={"es-ES"}
                      tileDisabled={({ date, view }) =>
                        view === "month" && // Block day tiles only
                        getDisabledDate().some((disabledDate) =>
                          disabledDate.some(
                            (disabled) =>
                              date.getFullYear() === disabled.getFullYear() &&
                              date.getMonth() === disabled.getMonth() &&
                              date.getDate() === disabled.getDate()
                          )
                        )
                      }
                      onActiveStartDateChange={({ action, activeStartDate, value, view }) => {
                        if (action === 'next' || action === 'prev') {
                          setActiveDate(prev => ({
                            ...prev,
                            current: activeDate.current === activeStartDate ? activeDate.current : activeStartDate
                          }))
                        }
                      }}
                    />
                    <hr className="calendar-line"></hr>
                  </div>
                </div>
              </div>
              <div className="booking-schedule-container">
                <h2>Tu horario de llegada</h2>
                <div className="booking-schedule">
                  <div className="schedule-info">
                    <i className="fa-regular fa-circle-check"></i>
                    <span>
                      Tu habitación va a estar lista para el check-in entre las
                      10:00 AM y las 11:00 PM
                    </span>
                  </div>
                  <div className="schedule-range">
                    <span>Indicá tu horario estimado de llegada</span>
                    <Schedule
                      alert={alertArrival}
                      messageArrival={messageArrival}
                      checkTimeStart={10}
                      checkTimeEnd={23}
                      exitEventRef={bookingContainerRef}
                      optionsActive={optionsActive}
                      arrival={selectArrivalHour}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="booking-right-container">
              <div className="booking-card">
                <h2>Detalle de la reserva</h2>
                <div className="tablet-container">
                  <img
                    className="product-img"
                    src={data.images[0].url}
                    alt="ProductIMG"
                  />
                  <div className="info-card">
                    <h4>{data.category.title}</h4>
                    <h3>{data.title}</h3>
                    <div className="stars-rating">
                      <i id="star1" className={data.score >= 2 ? "fa-solid fa-star good-stars" : "fa-solid fa-star"}></i>
                      <i id="star2" className={data.score >= 4 ? "fa-solid fa-star good-stars" : "fa-solid fa-star"}></i>
                      <i id="star3" className={data.score >= 6 ? "fa-solid fa-star good-stars" : "fa-solid fa-star"}></i>
                      <i id="star4" className={data.score >= 8 ? "fa-solid fa-star good-stars" : "fa-solid fa-star"}></i>
                      <i id="star5" className={data.score === 10 ? "fa-solid fa-star good-stars" : "fa-solid fa-star"}></i>
                    </div>
                    <div className="location">
                      <i className="fa-solid fa-location-dot"></i>
                      <p>
                        {data.address}, {data.city.name}, {data.city.country}
                      </p>
                    </div>
                    <div className="date-section">
                      <hr />
                      <div className="date">
                        <p>Check in</p>
                        <p>{checkIn.formated}</p>
                      </div>
                      <hr />
                      <div className="date">
                        <p>Check out</p>
                        <p>{checkOut.formated}</p>
                      </div>
                      <hr />
                    </div>
                    <div className="button-container">
                      <button onClick={confirmBooking}>
                        Confirmar reserva
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-container">
            <h2>Qué tenés que saber</h2>
            <hr />
            <div className="items-container">
              <div className="rules">
                <div className="item">
                  <h3>Normas de la casa</h3>
                  <ul>
                    {rules.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
                <div className="item">
                  <h3>Salud y seguridad</h3>
                  <ul>
                    {health.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="item">
                <h3>Política de cancelación</h3>
                <ul>
                  <li>
                    Agregá las fechas de tu viaje para obtener los detalles de
                    cancelación de esta estadía.
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
export default Booking;
