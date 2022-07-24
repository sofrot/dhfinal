import React, { useEffect, useState } from 'react';
import './carousel.css';

const Carousel = (props) => {
    const images = props.images;
    const [isFirstRender, setFirstRender] = useState(true);
    const [state, setState] = useState(
        {
            currentIndex: 0,
            thumbnailsClass: 'q ',
            isTransitioning: false,
            goingLeft: false
        }
    );


    const showPrevSet = () => {
        if (currentIndex > 0) {
            setState({
                currentIndex: currentIndex - 1
            });
            return
        }
        setState({ currentIndex: images.length - 1 });

    }

    const showNextSet = () => {
        if (currentIndex < images.length - 1) {
            setState({
                currentIndex: currentIndex + 1
            });
            return
        }
        setState({
            currentIndex: 0
        });
    }

    const handleThumbnailsClick = (e) => {
        setState({
            currentIndex: parseInt(e.target.getAttribute('index'))
        })
    }
    const { currentIndex, isTransitioning, goingLeft } = state;
    let { thumbnailsClass } = state;
    let autoSwipe = setTimeout(()=>{
        showNextSet();
    },props.swipeTime)
    
    useEffect(()=>{
        
        return () => {
            clearTimeout(autoSwipe)
        }
    })
    
    return (
        
        <div className='carousel-wrapper'>
            <span className='product-close-carousel' onClick={props.closeButton}>X</span>
            <div className='carousel-images-container'>
                {images.map((item, index, array) => {
                    let active = '';
                    if (index === currentIndex) {
                        active = ' active'
                    }
                    return <img src={item} key={`image:${index}`} className={'carousel-img' + active} />
                })}

            </div>
            <div className='carousel-index-container'>
                <div className='carousel-index'>
                    {`${currentIndex + 1} / ${images.length}`}
                </div>
            </div>
            <div className='carousel-thumbnails-container'>
                {images.map((item,index,array)=>{

                })}
                <img className={`carousel-thumbnail`} index={currentIndex + 1 < images.length ? currentIndex + 1 : currentIndex - 4} src={images[currentIndex + 1 < images.length ? currentIndex + 1 : currentIndex - 4]} onClick={handleThumbnailsClick} alt="1" />
                <img className={`carousel-thumbnail`} index={currentIndex + 2 < images.length ? currentIndex + 2 : currentIndex - 3} src={images[currentIndex + 2 < images.length ? currentIndex + 2 : currentIndex - 3]} onClick={handleThumbnailsClick} alt="2" />
                <img className={`carousel-thumbnail`} index={currentIndex + 3 < images.length ? currentIndex + 3 : currentIndex - 2} src={images[currentIndex + 3 < images.length ? currentIndex + 3 : currentIndex - 2]} onClick={handleThumbnailsClick} alt="3" />
                <img className={`carousel-thumbnail`} index={currentIndex + 4 < images.length ? currentIndex + 4 : currentIndex - 1} src={images[currentIndex + 4 < images.length ? currentIndex + 4 : currentIndex - 1]} onClick={handleThumbnailsClick} alt="4" />
            </div>
            <button className="carousel-button prev" onClick={showPrevSet}><span><i className="fa-solid fa-angle-left carousel-controls-icon"></i></span></button>
            <button className="carousel-button next" onClick={showNextSet}><span><i className="fa-solid fa-angle-right carousel-controls-icon"></i></span></button>

        </div>

    )
}

export default Carousel;
