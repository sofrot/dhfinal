import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-calendar";
import "./product.css";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import ImagesDisplay from "../ImagesDisplay/ImagesDisplay";
import NewMap from "../Map/NewMap";
import Carousel from "../Carousel/Carousel";
import AuthService from "../../services/auth.service";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";
import jwt from "jwt-decode";
import Swal from "sweetalert2";

export default function Product(props) {
  //Traigo el id del producto selecionado
  const [userFav, setUserFav] = useState(
    localStorage.getItem("user")
      ? jwt(localStorage.getItem("user")).user
      : false
  );
  const hearth = useRef(null);
  const [favourite, setFavourite] = useState(false);
  const { idProduct } = useParams();
  const [isFirstRender, setFirstRender] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [disabledDates, setDisabledDates] = useState();
  const [calendarValue, setCalendarValue] = useState("");
  const [activeDate, setActiveDate] = useState({ current: new Date() });
  const [favouriteArray, setFavouriteArray] = useState([]);
  const [calendarCurrentValue, setCalendarCurrentValue] = useState(null)
  const [calendarHomeValue, setCalendarHomeValue] = useState(localStorage.getItem('homeDate'))
  const images = isLoading
    ? ["Cargando..."]
    : data.images?.map((item) => item.url);

  const navigate = useNavigate();
  const location = useLocation();

  const [hideGallery, setHideGallery] = useState({
    boolean: true,
    string: "hide",
  });

  const calificacion = ["Malo", "Regular", "Bueno", "Muy Bueno", "Excelente"];

  const displayGallery = () => {
    if (hideGallery.boolean === false) {
      setHideGallery({
        boolean: true,
        string: "hide",
      });
      bg.current.style.display === "none"
        ? (bg.current.style.display = "block")
        : (bg.current.style.display = "none");
      return;
    }
    setHideGallery({
      boolean: false,
      string: "show",
    });
    bg.current.style.display === "none"
      ? (bg.current.style.display = "block")
      : (bg.current.style.display = "none");
  };

  useEffect(() => {
    if (!data) {
      window.scrollTo(0, 0);
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
          setIsLoading(true);
          navigate("/product/NotFound");
        });
      //setFirstRender(false);
      //return;
    }
    if (user) {
      fetch(
        `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/user/favorites/${userFav.email}`
      )
        .then((response) => {
          if (!response.ok) throw Error(response.status);
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          setFavouriteArray(data);
        })
        .catch(() => {
          setIsLoading(true);
        });
    }

    if (!user) {
      setUser(AuthService.getCurrentUser());
    }
    if (data) {
      setIsLoading(false);
    }
    return () => {
      if (!user) {
        setUser(AuthService.getCurrentUser());
      }
    };
  }, [isFirstRender, hideGallery, navigate, data, user]);

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

  const popup = useRef(null);
  const field = useRef(null);
  const input = useRef(null);
  const copy = useRef(null);
  const bg = useRef(null);

  const shareSocialMedia = () => {
    document.body.style.overflow === "hidden"
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
    popup.current.classList.toggle("show");
    bg.current.style.display === "none"
      ? (bg.current.style.display = "block")
      : (bg.current.style.display = "none");
  };

  const copyUrl = () => {
    if (navigator.clipboard.writeText(input.current.value)) {
      field.current.classList.add("active");
      copy.current.innerText = "Copiado!";
      setTimeout(() => {
        field.current.classList.remove("active");
        copy.current.innerText = "Copiar";
      }, 3000);
    }
  };
  const simplifyArray = (arr) => {
    let disabledDatesNewArr = [];
    arr.forEach((element) => {
      disabledDatesNewArr = disabledDatesNewArr.concat(element);
    });
    return disabledDatesNewArr;
  };
  const dateHandler = (e) => {
    const selectedDaysArr = getDates(e[0], e[1]);
    const disabledDatesArr = getDisabledDate();
    const disabledDatesNewArray = simplifyArray(disabledDatesArr);
    let isMatch = false;
    for (let i = 0; i < selectedDaysArr.length; i++) {
      const element = selectedDaysArr[i];
      for (let j = 0; j < disabledDatesNewArray.length; j++) {
        const element2 = disabledDatesNewArray[j];
        if (
          element.getDate() == element2.getDate() &&
          element.getMonth() == element2.getMonth() &&
          element.getFullYear() == element2.getFullYear()
        ) {
          isMatch = true;
        }
      }
    }
    if (isMatch) {
      setCalendarValue(null);
    } else {
      setCalendarValue();
      setCalendarCurrentValue(e)
    }
  };
  const isFavourite = () => {
    favouriteArray.forEach((e) => {
      if (e.id === data.id) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    });
  };
  const onclickHeart = (valueHeart) => {
    if (!valueHeart) {
      handleAddFav();
    } else {
      handleDeleteFav();
    }
  };
  const handleAddFav = () => {
    Swal.fire({
      title: "Deseas añadir este producto a favoritos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, deseo añadir este producto!",
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        addFavourite();
        Swal.fire({
          title: `${data?.title} se agrego a favoritos`,
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: "Success",
          confirmButtonColor: "#f0572d",
          confirmButtonText: "Aceptar",
          focusConfirm: false,
        });
      }
    });
  };
  const handleDeleteFav = () => {
    Swal.fire({
      title: "Deseas eliminar este producto de favoritos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, deseo eliminar este producto!",
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFavourite();
        Swal.fire({
          title: `${data?.title} se elimino de tus favoritos`,
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: "Success",
          confirmButtonColor: "#f0572d",
          confirmButtonText: "Aceptar",
          focusConfirm: false,
        });
      }
    });
  };
  const deleteFavourite = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + AuthService.getCurrentUser().jwt
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/user/favorite/delete/${user.email}/${data.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setFavourite(false);
      })
      .catch((error) => { });
  };
  const addFavourite = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + AuthService.getCurrentUser().jwt
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/user/favorite/create/${user.email}/${data.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setFavourite(true);
      })
      .catch((error) => { });
  };
  const handleCalendarHomeValue = () => {
    const homeDate = JSON.parse(calendarHomeValue)
    if (homeDate) {
      const parsedDate = (homeDate.map((e) => {
        return new Date(e.slice(0, 10))
      }))
      const selectedDaysArr = getDates(parsedDate[0], parsedDate[1]);
    const disabledDatesArr = getDisabledDate();
    const disabledDatesNewArray = simplifyArray(disabledDatesArr);
    let isMatch = false;
    for (let i = 0; i < selectedDaysArr.length; i++) {
      const element = selectedDaysArr[i];
      for (let j = 0; j < disabledDatesNewArray.length; j++) {
        const element2 = disabledDatesNewArray[j];
        if (
          element.getDate() == element2.getDate() &&
          element.getMonth() == element2.getMonth() &&
          element.getFullYear() == element2.getFullYear()
        ) {
          isMatch = true;
        }
      }
    }
    if (isMatch) {
      setCalendarValue(null);
    } else {
      setCalendarValue(parsedDate)
    }
    }
    
  }
  useEffect(() => {
    handleCalendarHomeValue()
  }, [calendarHomeValue])
  return (
    <section className="product-view" data-testid="product1">
      {isLoading ? (
        <div className="booking-loading">
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/4400319/loading_crescor_dribbble.gif"
            alt="CategoryLoader"
          />
        </div>
      ) : (
        <div>
          <div
            className={"product-carousel-container "}
            ref={bg}
            style={{ display: "none" }}
          >
            <div
              className="carousel-background"
              onClick={() => {
                if (popup && popup.current.classList.contains("show")) {
                  shareSocialMedia();
                } else {
                  displayGallery();
                }
              }}
            ></div>
          </div>
          <div className="top-container">
            <div className="top">
              <div className="product-title">
                <h4>{data?.category.title}</h4>
                <h2>{data?.title}</h2>
              </div>
              <div className="back-home">
                <Link to={"/"}>
                  <i className="fa-solid fa-chevron-left"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="location-container">
            <div className="location">
              <div className="location-info">
                <i className="fa-solid fa-location-dot"></i>
                <p>
                  {data.city.name}, {data.city.country}
                </p>
              </div>
              <div className="rating">
                <div className="valoration-stars">
                  <p>{calificacion[data.score / 2 - 1]}</p>
                  <div className="rating-stars">
                    <i
                      id="star1"
                      className={
                        data.score >= 2
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star2"
                      className={
                        data.score >= 4
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star3"
                      className={
                        data.score >= 6
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star4"
                      className={
                        data.score >= 8
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                    <i
                      id="star5"
                      className={
                        data.score == 10
                          ? "fa-solid fa-star good-stars"
                          : "fa-solid fa-star"
                      }
                    ></i>
                  </div>
                </div>
                <div className="average">
                  <p>{data.score}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="img-container">
            <div className="actions">
              <i
                className="fa-solid fa-share-nodes"
                onClick={shareSocialMedia}
              ></i>
              <svg
                ref={hearth}
                onClick={() => (user ? onclickHeart(favourite) : null)}
                className="fa-heart"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={
                  favourite
                    ? {
                      display: "block",
                      fill: "red",
                      height: "28px",
                      width: "28px",
                      stroke: "var(--negro)",
                      strokeWidth: "3",
                      overflow: "visible",
                    }
                    : {
                      display: "block",
                      fill: "white",
                      height: "30px",
                      width: "30px",
                      stroke: "var(--negro)",
                      strokeWidth: "3",
                      overflow: "visible",
                    }
                }
              >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
              </svg>
            </div>
            <div className="popup-container">
              <div className="popup" ref={popup}>
                <header>
                  <span>Comparte este producto!</span>
                  <div className="close" onClick={shareSocialMedia}>
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </header>
                <div className="content">
                  <p>Hazlo en tus redes sociales</p>
                  <ul className="icons">
                    <FacebookShareButton
                      url={window.location}
                      quote={"Mira este incrible lugar!"}
                    >
                      <a className="facebook-icon">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </FacebookShareButton>
                    <PinterestShareButton
                      url={window.location}
                      media={images[0]}
                    >
                      <a className="pinterest-icon">
                        <i className="fa-brands fa-pinterest"></i>
                      </a>
                    </PinterestShareButton>
                    <TelegramShareButton
                      url={window.location}
                      title={"Mira este incrible lugar!"}
                    >
                      <a className="telegram-icon">
                        <i className="fab fa-telegram-plane"></i>
                      </a>
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={window.location}
                      title={"Mira este incrible lugar!"}
                      separator=":: "
                    >
                      <a className="whatsapp-icon">
                        <i className="fab fa-whatsapp"></i>
                      </a>
                    </WhatsappShareButton>
                    <TwitterShareButton
                      url={window.location}
                      title={"Mira este incrible lugar!"}
                    >
                      <a className="twitter-icon">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </TwitterShareButton>
                  </ul>
                  <p>O tambien puedes usar el siguiente link</p>
                  <div className="field" ref={field}>
                    <i className="fa-solid fa-link"></i>
                    <input
                      type="text"
                      readOnly
                      defaultValue={window.location}
                      ref={input}
                    />
                    <button onClick={copyUrl} ref={copy}>
                      Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={hideGallery.string}>
              <Carousel
                images={images}
                swipeTime={3000}
                closeButton={displayGallery}
              />
            </div>
            <ImagesDisplay images={images} displayGallery={displayGallery} />
          </div>
          <div className="info-container">
            <h2>{data.slogan}</h2>
            {data.description.split("\n").map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <div className="features-container">
            <h2>¿Qué ofrece este lugar?</h2>
            <hr />
            <div className="features">
              {data.features.map((item, index) => {
                let classFeature = "";
                switch (item.id) {
                  case 1:
                    classFeature = "fa-solid fa-fire-burner";
                    break;
                  case 2:
                    classFeature = "fa-solid fa-tv";
                    break;
                  case 3:
                    classFeature = "fa-solid fa-snowflake";
                    break;
                  case 4:
                    classFeature = "fa-solid fa-wifi";
                    break;
                  case 5:
                    classFeature = "fa-solid fa-person-swimming";
                    break;
                  case 6:
                    classFeature = "fa-solid fa-spa";
                    break;
                  case 7:
                    classFeature = "fa-solid fa-wine-bottle";
                    break;
                  case 8:
                    classFeature = "fa-solid fa-dumbbell";
                    break;
                  case 9:
                    classFeature = "fa-solid fa-utensils";
                    break;
                  case 10:
                    classFeature = "fa-solid fa-car";
                    break;
                  case 11:
                    classFeature = "fa-solid fa-mug-saucer";
                    break;
                  case 12:
                    classFeature = "fa-brands fa-accessible-icon";
                    break;
                  default:
                    break;
                }
                return (
                  <div key={index + item} className="feature-item">
                    <i className={classFeature}></i>
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="calendar-container">
            <h2>Fechas disponibles</h2>
            <div className="desktop-container">
              <div className="calendar-mobile calendar-desktop">
                <Calendar
                  allowPartialRange={false}
                  activeStartDate={activeDate.current}
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
                  onChange={dateHandler}
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
                  onActiveStartDateChange={({
                    action,
                    activeStartDate,
                    value,
                    view,
                  }) => {
                    if (action === "next" || action === "prev") {
                      setActiveDate((prev) => ({
                        ...prev,
                        current:
                          activeDate.current === activeStartDate
                            ? activeDate.current
                            : activeStartDate,
                      }));
                    }
                  }}
                />
                <hr className="calendar-line"></hr>
              </div>
              <div className="booking">
                <div>
                  <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                  {user ? (
                    <Link to={`${location.pathname + "/booking"}`} state={{ cValue: calendarCurrentValue }}
                    >
                      <button>Iniciar reserva</button>
                    </Link>
                  ) : (
                    <Link
                      to={"/login"}
                      state={{
                        bookingMessage:
                          "Para realizar una reserva necesitas estar logueado",
                      }}
                    >
                      <button>Iniciar reserva</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="map-container">
            <h2>¿Dónde vas a estar?</h2>
            <hr />
            <p>
              {data.city.name}, {data.city.country}
            </p>
            <div className="map">
              <NewMap
                city={data.city.name + "," + data.address}
                cardInfo={data}
              />
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
                    {data.policies[0].rules.split(".").map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
                <div className="item">
                  <h3>Salud y seguridad</h3>
                  <ul>
                    {data.policies[0].health.split(".").map((item, index) => {
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
      )}
    </section>
  );
}
