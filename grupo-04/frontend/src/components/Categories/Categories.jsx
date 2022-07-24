import React from "react";
import { useState, useEffect } from "react";
import "./categoriesStyle.css";
import { Category } from "./Category";
import URL from "../../url.json";
import { useRef } from "react";
//import BloqueListado from "../BloqueListado/BloqueListado";

const Categories = (props) => {
  const url = URL.api;
  const apiURL = url + "/api/categories/findAll";

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [apiURL, history, props.clear]);

  const scroll = useRef(null)

  return (
    <>
      <div className="categoryContainer">
        <div className="categoryBlock">
          {isLoading ? (
            <></>
          ) : (
            <div>
              <button className="prev-category" onClick={()=>scroll.current.scrollLeft -= 50}><i className="fa-solid fa-angle-left"></i></button>
              <button className="next-category" onClick={()=>scroll.current.scrollLeft += 50}><i className="fa-solid fa-angle-right"></i></button>
              <div className="categoryBox" ref={scroll}>
                {data.map((category, index) => (
                  <Category
                    key={index + category.title}
                    click={props.selection}
                    id={category.id}
                    imageUrl={category.url}
                    title={category.title}
                    description={category.description}
                    history={history}
                    clear={props.clear}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
