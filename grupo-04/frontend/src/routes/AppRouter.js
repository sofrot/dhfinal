import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Categories from '../components/Categories/Categories';
import Buscador from '../components/Buscador/Buscador';
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Product from "../components/Product/Product";
import BloqueListado from "../components/BloqueListado/BloqueListado";
import ErrorProduct from "../components/Error404/ErrorProduct";
import Booking from "../components/Booking/Booking";
import CreateProduct from "../components/CreateProduct/CreateProduct";
import Favourites from "../components/Favourites/Favourites";
import UserBookings from "../components/UserBookings/UserBookings";
import AuthService from "../services/auth.service";
export const AppRouter = (props) => {

    const [userData, setUserData] = useState(null)
    const [category, setCategory] = useState("");
    const selectionCategory = (category) => {
        //console.log(category);
        setCategory(category);
        //setCity("");
    }

    const [city, setCity] = useState("");
    const selectionCity = (city) => {
        //console.log(city);
        setCity(city);
        //setCategory("");
    }

    const [reservation, setReservation] = useState("");
    const selectionReserva = (reserv) => {
        //console.log(reserv);
        setReservation(reserv);
    }

    const clearFilters = () => {
        setReservation(null);
        setCity(null);
        setCategory(null);
    }
    useEffect(() => {
        if(!userData){
            try {
                setUserData(AuthService.getCurrentUser().jwt);
            } catch {
                setUserData(false);
            }
        }
    }, [userData])
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Buscador selectionCity={selectionCity} selectionReserva={selectionReserva} clear={reservation} />
                    <Categories selection={selectionCategory} clear={category} />
                    <BloqueListado categoryType={category} cityType={city} reservationType={reservation} clear={clearFilters} />
                </>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login changeIsUser={props.changeIsUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:title/:idProduct" element={<Product />} />
            <Route path="/product/:title/:idProduct/booking" element={<Booking />} />
            <Route path="/product/notFound" element={<ErrorProduct />} />
            <Route path="/admin/createProduct" element={<CreateProduct />} />
            <Route path="/user/favourites" element={<Favourites />} />
            <Route path="/user/bookings" element={<UserBookings userData={userData} />} />
        </Routes>
    )
}