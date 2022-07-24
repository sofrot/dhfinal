import React, { useRef, useEffect } from "react";

export const Category = ({
  imageUrl,
  title,
  description,
  click,
  id,
  history,
  clear
}) => {
  const categorySelectedName = useRef(null)

   useEffect(() => {
    if(history[history.length-1] === '' || history[history.length-1] === undefined){
      categorySelectedName.current.style.color = "white";
      //categorySelectedName.current.style.textDecoration = "none";
    }
    else if(history[history.length-1] !== id){
      categorySelectedName.current.style.color = "white";
      //categorySelectedName.current.style.textDecoration = "none";
    }
    if(history[history.length-1] === id){
      categorySelectedName.current.style.color = "orange";
      //categorySelectedName.current.style.textDecoration = "underline white";
    }
   }, [history, id, click]);

  const onTrigger = (event) => {
    if (history[history.length-1] !== event) {
      click(event);
      history.push(event);
    }
    else if (history[history.length-1] === event) {
      click("");
      history.push('');
    }
  };

  useEffect(()=>{
    if(clear === null){
      click("");
      history.push('');
    }
  },[clear])

  return (
    <div
      className="container-selector"
      index={id}
      onClick={() => {
        onTrigger(id);
      }}
    >
      <div
        className="categoryCard"
        id={title}
      >
        <img className="categoryImage" src={imageUrl} alt="Cat"></img>
        <div className="categoryType">
          <h3 ref={categorySelectedName} style={{ color: "white" }}>{title}</h3>
          {/* <p>{description}</p> */}
        </div>
      </div>
    </div>
  );
};
