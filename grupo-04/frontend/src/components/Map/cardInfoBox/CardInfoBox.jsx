
import './cardInfoBox.css'

const CardInfoBox = (props) =>{
    
    return(
        <div className='infoBoxMap-container'>
            <div className='infoBoxMap-label'>
                <div className="stars-rating">
                    <i id="star1" className={props.infoBox?.score>=2? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star2" className={props.infoBox?.score>=4? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star3" className={props.infoBox?.score>=6? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star4" className={props.infoBox?.score>=8? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                    <i id="star5" className={props.infoBox?.score===10? "fa-solid fa-star good-stars":"fa-solid fa-star"}></i>
                </div>
                <h3>{props.infoBox?.title}</h3>
                <p>{props.infoBox?.name}</p>
            </div>
            <div className='infoBoxMap-img'>
                <img src={props.infoBox? props.infoBox.images[0].url:''} alt="Hotel-Ref" />
            </div>
        </div>
    )
}

export default CardInfoBox;