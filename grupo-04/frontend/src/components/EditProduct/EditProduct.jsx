import React from "react";
import { useEffect, useState } from "react";
import "./editproduct.css"
import url from "../../url.json"
import { useNavigate } from "react-router-dom";
import CreateProduct from "../CreateProduct/CreateProduct";
const EditProduct = () => {
    const [data, setData] = useState(null)
    const [arr, setArr] = useState(null)
    const navigate = useNavigate();
    const [isEditing, setEditing] = useState(null)
    const [editData, setEditData] = useState(null)
    useEffect(() => {
        
        if (!data) {
            fetch(`${url.api}/api/product/findAll`)
                .then(response => response.json())
                .then(data => setData(data))
        }
        if (!arr) {
            setArr(data)
        }


    }, [data, arr, isEditing])
    const handleEdit = (data, e) => {
        navigate(`/admin/editProduct/${data.id}`)
    }
    const handleDelete = (id, e) => {
        
    }
    const filteredArr = (e) => {
        const fArr = data.map((element) => {
            if (element.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                return element
            }
        })
        const fArrFiltered = fArr.filter((element) => {
            return element !== undefined
        })
        setArr(fArrFiltered)

    }
    //
    return (
        <div>
            <div className="edit-product-main-container">
                <div>
                    <div className="edit-product-table-container">
                        <div className="edit-product-search-bar">
                            <span>Buscador</span>
                            <input className="search-bar" type="text" onChange={filteredArr} />
                        </div>
                        <div className="edit-product-table-row1">
                            <div className="row1-field-index">
                                #
                            </div>
                            <div className="row1-field">
                                Título
                            </div>
                            <div className="row1-field">
                                Categoría
                            </div>
                            <div className="row1-field">
                                País
                            </div>
                            <div className="row1-field">
                                Ciudad
                            </div>

                        </div>
                        {arr?.map((element) => {
                            return (
                                <div className="edit-product-table-row1">
                                    <div className="row1-field-index">
                                        {element?.id}
                                    </div>
                                    <div className="row1-field">
                                        {element?.title}
                                    </div>
                                    <div className="row1-field">
                                        {element?.name}
                                    </div>
                                    <div className="row1-field">
                                        {element?.city.country}
                                    </div>
                                    <div className="row1-field">
                                        {element?.city.name}
                                    </div>
                                    <div className="row1-icons" onClick={(e) => { handleEdit(element, e) }}><i className="fa-solid fa-pen-to-square"></i></div>
                                    <div className="row1-icons" onClick={(e) => { handleDelete(element, e) }}><i className="fa-solid fa-trash-can"></i></div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>



    )

}

export default EditProduct;