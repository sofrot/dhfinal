
import './cardInfoBox.css'

const CardInfoBox = (props) =>{
    
    return(
        <div className='infoBoxMap-container'>
            <div className='infoBoxMap-label'>
                <div className="stars-rating">
                    <i id="star1" className={props.info?.score>=2? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star2" className={props.info?.score>=4? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star3" className={props.info?.score>=6? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star4" className={props.info?.score>=8? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star5" className={props.info?.score===10? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                </div>
                <h3>{props.info?.title}</h3>
                <p>{props.info?.name}</p>
            </div>
            <div className='infoBoxMap-img'>
                <img src={props.info? props.info.images[0].url:''} alt="Hotel-Ref" />
            </div>
        </div>
    )
}

export default CardInfoBox;