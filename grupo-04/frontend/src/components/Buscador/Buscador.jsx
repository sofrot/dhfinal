import "./styleSearcher.css";
import { useState, useEffect, useRef } from "react";
//import cities from './cities.json'
import SelectCities from "./impl/SelectCities";
import SelectDate from "./impl/SelectDate";
import URL from "../../url.json";

const Searcher = (props) => {
  const [dataCities, setDataCities] = useState(null);

  const [selectCitie, setSelectCitie] = useState("");
  const [isSelectCities, setIsSelectCities] = useState(false);
  const [inputCity, setInputCity] = useState("");
  const refCities = useRef(null);

  const [isSelectDates, setIsSelectDates] = useState(false);
  const [inputDate, setInputDate] = useState("");
  const [isAcceptDate, setIsAcceptDate] = useState(false);
  const refDates = useRef(null);

  /*Consumo API*/
  const url = URL.api;
  const nodoApi = "/api/cities/findAll";
  useEffect(() => {
    localStorage.setItem('homeDate', JSON.stringify(inputDate))
  }, [inputDate])
  const fetchApiCity = () => {
    fetch(url + nodoApi, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {

        setDataCities(result);
      })
      .catch((error) => { });
  };

  useEffect(() => {

    outsideClickCities(refCities);
    outsideClickDates(refDates);
    fetchApiCity();
    if (props.clear === null) {
      setInputCity("");
      setSelectCitie("");
      setInputDate(null);
      setIsAcceptDate(false);
    }
  }, [props.clear]);

  /*---------EVENTOS CIUDADES----------- */

  const outsideClickCities = (ref) => {
    document.addEventListener("click", (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsSelectCities(false);
      }
    });
  };

  const clickInputCity = () => {
    if (isSelectCities) {

      setIsSelectCities(false);
    } else {

      setIsSelectCities(true);
      setIsSelectDates(false);
    }
  };

  const changeInputCity = (event) => {
    setInputCity(event.target.value);
    setSelectCitie(event.target.value ? event.target.value : 0);

    let reg = new RegExp(`${event.target.value}`, "i");
    let newArray = dataCities.filter((city) =>
      reg.test(city.name + ", " + city.country)
    );

    if (event.target.value !== "" && newArray.length !== 0) {
      setDataCities(newArray);
    } else {
      fetchApiCity();
    }
  };

  const selectOptionCity = (op) => {
    setSelectCitie(op.id);
    let city = op.name + ", " + op.country;
    setInputCity(city);
    setIsSelectCities(false);
  };

  const deleteSelectCity = () => {

    setInputCity("");
    setSelectCitie("");
    //A preguntar
    props.selectionCity("");
  };

  /*---------EVENTOS CALENDARIO----------- */
  const outsideClickDates = (ref) => {
    document.addEventListener("click", (event) => {
      const reg = /^<abbr +/; // aca valido la etiqueta del botton del calendario asi no me lo cierra el calendario
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !reg.test(event.target.outerHTML)
      ) {
        setIsSelectDates(false);
      }
    });
  };

  const clickInputDate = () => {
    if (isSelectDates) {
      setIsSelectDates(false);
    } else {
      setIsSelectDates(true);
      setIsSelectCities(false);
    }
  };

  const acceptInputDate = (event) => {
    event.preventDefault();
    if (event.target.innerText === "Aplicar" && inputDate) {
      setIsAcceptDate(true);
      setIsSelectDates(false);
    }
    if (event.target.innerText === "Cancelar") {
      setIsAcceptDate(false);
      setInputDate(null); //limpia el calendar
      props.selectionReserva("");
    }
  };
  const deleteSelectDate = () => {
    setInputDate(null);
    setIsAcceptDate(false);
    props.selectionReserva("");
  };

  const options = { month: "long", day: "numeric" };

  //-----------------------------

  const clickButton = (event) => {
    event.preventDefault();
    if (inputCity) {
      props.selectionCity(selectCitie);
    } else {
      props.selectionCity("");
    }

    if (inputDate) {
      props.selectionReserva({
        checkIn: inputDate[0].toISOString().slice(0, 10),
        checkOut: inputDate[1].toISOString().slice(0, 10),
      });
    } else {
      props.selectionReserva("");
    }

    //setInputCity('');
    //setInputDate('');
  };

  const changeCalendar = (value, event) => {
    event.preventDefault();
    //aca se podria validar?
    setInputDate(value);
  };

  return (
    <div className="searchConteiner" data-testid="buscador1">
      <h1>Busca ofertas en casas, apartamentos y mucho más</h1>
      <form className="searchMenu">
        <div className="cities" ref={refCities}>
          <div className="selectCity">
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            <input
              className="city"
              type="text"
              placeholder="¿A donde vamos?"
              defaultValue={inputCity ? inputCity : ""}
              onClick={clickInputCity}
              onChange={changeInputCity}
            /*disabled={isSelectDates? true:false}*/
            />
            {inputCity ? (
              <i className="fa-solid fa-xmark" onClick={deleteSelectCity}></i>
            ) : (
              <></>
            )}
          </div>
          {isSelectCities ? (
            <SelectCities options={dataCities} election={selectOptionCity} />
          ) : (
            <></>
          )}
        </div>
        <div className="dates" ref={refDates}>
          <div className="selectDate">
            <i className="far fa-calendar-alt" aria-hidden="true"></i>
            <input
              className="date"
              type="text"
              placeholder="Check in - Check out"
              defaultValue={
                inputDate
                  ? inputDate[0].toLocaleDateString("es-Es", options) +
                  " - " +
                  inputDate[1].toLocaleDateString("es-Es", options)
                  : ""
              }
              onClick={clickInputDate} /*disabled={isSelectCities? true:false}*/
            />
            {isAcceptDate ? (
              <i className="fa-solid fa-xmark" onClick={deleteSelectDate}></i>
            ) : (
              <></>
            )}
          </div>
          {isSelectDates ? (
            <SelectDate
              onChange={changeCalendar}
              value={inputDate}
              onClick={acceptInputDate}
              isAcceptDate={isAcceptDate}
            />
          ) : (
            <></>
          )}
        </div>
        <button className="searchButton" onClick={clickButton}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Searcher;
