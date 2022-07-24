import React, { useEffect, useState } from "react";
import './imagesdisplay.css';
import Carousel from "../Carousel/Carousel";
import '../Product/product.css'
const ImagesDisplay = (props) => {
    
    const imgFirst = props.images[0];
    const imgList = props.images.slice(1);

    const imgBorderRadius = (e) => {
        if(e===2){
            return {borderTopRightRadius: "20px"}
        }
        if(e===3){
            return {borderBottomRightRadius: "20px"}
        }
    }
    
    return (
        <div className="img-display-react-container">
            <div className="img-gallery-container">
                <div className="gallery">
                    <img src={imgFirst} alt="main img" className="main-img" />
                    <div className="other-img">
                        {
                            imgList.map((img,index)=>{
                                if(index === imgList.length - 1){
                                return <div className="gallery-last-image-container"><span className="display-img-detail-button" onClick={props.displayGallery}><div className="show-more-text"> <span>Ver más</span></div></span><img src={img} alt={"img"+index} key={index + 'img'}></img></div>
                                }
                                return <img src={img} className="img" alt={"img"+index} key={index + 'img'}/>
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagesDisplay;