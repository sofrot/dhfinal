import React, { useState, useEffect } from "react";
import "./BloqueListado.css";
import CardListado from "./card/CardListado";

import NewMap from "../Map/NewMap";
import AuthService from "../../services/auth.service";
import { useRef } from "react";

const BloqueListado = (props) => {
  const [randomList, setRandomList] = useState([]);
  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [optionsActive, setOptionsActive] = useState({ class: '', active: false, city: '', country: '' })
  const [user, setUser] = useState(
    localStorage.getItem("user") ? AuthService.getCurrentUser() : ""
  );
  const showOnMapRef = useRef(null)
  const [pag, setPag] = useState(0);

  const [isRefresh, setIsRefresh] = useState(false);

  const getNodoApi = () => {
    var nodoApi = new URL(
      "http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/product/findByAll"
    );
    if (pag) {
      nodoApi.searchParams.append("pag", pag);
    }

    if (props.categoryType) {
      nodoApi.searchParams.append("categoryId", props.categoryType);
    }

    if (props.cityType) {
      nodoApi.searchParams.append("cityId", props.cityType);
    }

    if (props.reservationType) {
      nodoApi.searchParams.append("checkIn", props.reservationType.checkIn);
      nodoApi.searchParams.append("checkOut", props.reservationType.checkOut);
    }
    return nodoApi;
  };

  const [categories, setCategories] = useState(0);
  const [cities, setCities] = useState(0);


  useEffect(() => {
    updateList();

    setCategory(props.categoryType);
    fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/categories/findAll`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {

      });
    fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/cities/findAll`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch(() => {

      });
  }, [props.categoryType, props.cityType, props.reservationType, pag]);

  useEffect(() => {

  }, [optionsActive])
  const updateFavourites = () => {
    return fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/user/favorites/${user.email}`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response;
      })
      .then((response) => response.json())
      .catch((error) => { });
  }

  const updateList = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(getNodoApi(), requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.length !== 0) {
          let newArray = [];
          for (let i = 0; i < result.length; i++) {
            if (result[i].active) {
              newArray.push({ product: result[i], favourite: false })
            }
          }

          updateFavourites()
            .then(res => {
              for (let i = 0; i < newArray.length; i++) {
                for (let j = 0; j < res.length; j++) {
                  if (res[j].id == newArray[i].product.id) {
                    newArray[i] = { product: newArray[i].product, favourite: true };
                  }
                }
              }
            })
            .catch(e => {  });
          
          setRandomList(newArray);
          setIsLoading(false);
        } else {
          setRandomList([]);
        }
      })
      .catch((error) => {
        setIsLoading(true);
       
      });
  };

  const next = () => {
    if (pag >= 0 && randomList.length !== 0) setPag(pag + 1);
  };

  const previous = () => {
    if (pag > 0) setPag(pag - 1);
  };


  // const showFilter = () => {
  //   if (props.categoryType || props.cityType) {
  //     if (props.categoryType && props.cityType) {
  //       return (
  //         categories[props.categoryType - 1].title +
  //         " > " +
  //         cities[props.cityType - 1].name
  //       );
  //     }
  //     if (props.categoryType) {
  //       return categories[props.categoryType - 1].title;
  //     }
  //     if (props.cityType) {
  //       return cities[props.cityType - 1].name;
  //     }
  //   } else {
  //     return "Recomendaciones";
  //   }
  // };

  const clearFilters = () =>{
    props.clear()
  }
  const handleShowOnMap = (city, country, e) => {
    setOptionsActive({ class: 'show-on-map-active', active: true, city: city, country: country })
    document.body.style.overflow = "hidden"
    showOnMapRef.current.scrollIntoView()
  }

  // useEffect(()=>{
  //   clearFilters()
  // },[])
  const handleMapExit = () => {
    if (optionsActive.active) {
      document.body.style.overflow = "auto"
      setOptionsActive({ class: '', active: false, city: '', country: '' })
    }
  }
  useEffect(() => {
    clearFilters()
  
    return () => {
      clearFilters()
    }
  }, [])
  

  return (
    <div className="super" >
      <div className="title-filter">
      <h2 className="block-h2">Recomendaciones</h2> 
      {(props.reservationType || props.categoryType || props.cityType) && <button className="clear-filter" onClick={clearFilters}>Limpiar filtros</button>}
      </div>
      {isLoading ? (
        <div className="loader">
          <div className="loading">
            <h2>Cargando productos</h2>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="recomendaciones-container">
          {randomList.length !== 0 ? (
            <div className="block-main">
              <div className="render-container">
                {randomList.map((item, index, array) => {
                  if (index < array.length / 2) {
                    return (
                      <CardListado
                        key={index + ":" + item.product.title}
                        cardInfo={item.product}
                        favourite={item.favourite}
                        handleShowOnMap={handleShowOnMap}
                      />
                    );
                  }
                })}
              </div>
              <div className="render-container">
                {randomList.map((item, index, array) => {
                  if (index >= array.length / 2) {
                    return (
                      <CardListado
                        cardInfo={item.product}
                        key={index + ":" + item.product.title}
                        favourite={item.favourite}
                        handleShowOnMap={handleShowOnMap}
                      />
                    );
                  }
                  return;
                })}
              </div>
            </div>
          ) : (
            <h3>No hay mas productos :( </h3>
          )}
          <div className="pages">
            <i
              className="fa-solid fa-angle-left"
              onClick={previous}
            ></i>
            <div className="page">{pag + 1}</div>
            <i
              className="fa-solid fa-angle-right"
              onClick={next}
            ></i>
          </div>
        </div>
      )}
      <div className={`show-on-map-background ${optionsActive.class}`} onClick={handleMapExit} ref={showOnMapRef}>
        <div className={`show-on-map map ${optionsActive.class}`} >
          <span className="show-on-map-exit map" onClick={handleMapExit}><i className="fa-solid fa-xmark map"></i></span>
          <div className="show-on-map-item map"> {optionsActive?.city + ', ' + optionsActive?.country}</div>
          <NewMap city={optionsActive.city}></NewMap>
        </div>
      </div>

    </div>

  );
};

export default BloqueListado;
