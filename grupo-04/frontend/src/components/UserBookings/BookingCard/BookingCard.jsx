import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
import "./bookingCard.css"
const BookingCard = (props) => {
    const [isFirstRender, setFirstRender] = useState(true)
    const [data, setData] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        if(!data){
            setData(props.data)
        }
        
    })
    const goToHotel = (e) => {
        e.preventDefault();
        navigate(`/product/${data.product.title.replace(/\s/g, "-")}/${data.product.id}`)
    }
    return (
        <div className="booking-card-container">
            {data? (
                <div>
                    <h2>{`Reserva #${props.index + 1}`}</h2>
            <div className="booking-card-item-name booking-card-container-item">
                <span className="container-item-desc-type">Nombre:</span>
                <span>{data.product.title}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Categoría:</span>
                <span>{data.product.category.title}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">País:</span>
                <span>{data.product.city.country}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Ciudad:</span>
                <span>{data.product.city.name}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Dirección:</span>
                <span>{data.product.city.address}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Teléfono:</span>
                <span>*Sin información</span>
            </div>
            <div className="booking-card-hotel-button" onClick={goToHotel}>Ir a Hotel</div>
            <hr className="booking-card-spacer" />
            <h3>Detalles de la reserva</h3>
            <div className="booking-card-item-name booking-card-container-item">
                <span className="container-item-desc-type">Check-In:</span>
                <span>{data.checkIn}</span>
            </div>
            <div className="booking-card-item-name booking-card-container-item">
                <span className="container-item-desc-type">Check-Out:</span>
                <span>{data.checkOut}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Llegada:</span>
                <span>{data.arrival.slice(0,5)}hs</span>
            </div>
            <hr className="booking-card-spacer" />
            <h3>Usuario</h3>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Nombre:</span>
                <span>{data.user.name}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Apellido</span>
                <span>{data.user.lastName}</span>
            </div>
            <div className="booking-card-category booking-card-container-item">
                <span className="container-item-desc-type">Correo:</span>
                <span>{data.user.email}</span>
            </div>
        
                </div>
            ) 
            : (
                <div>
                    cargando
                </div>
            ) }
        </div>
    )
}

export default BookingCard;