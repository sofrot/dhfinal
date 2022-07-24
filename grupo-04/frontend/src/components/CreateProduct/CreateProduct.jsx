import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createProduct.css";
import UploadImageS3 from "./uploadImgS3/UploadImageS3";
import { uploadFile } from "react-s3";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import Swal from "sweetalert2";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);

  const [inputCategory, setInputCategory] = useState();
  const [inputTitle, setInputTitle] = useState();
  const [inputDescription, setInputDescription] = useState();
  const [inputIntroduction, setInputIntroduction] = useState();
  const [inputSlogan, setInputSlogan] = useState();
  const [inputCity, setInputCity] = useState();
  const [inputAddress, setInputAddress] = useState();
  const [inputFeatures, setInputFeatures] = useState([]);

  const [inputPolicesRules, setInputPolicesRules] = useState();
  const [inputPolicesHealth, setInputPolicesHealth] = useState();
  const [inputPolicesCancellation, setInputPolicesCancellation] = useState();

  useEffect(() => {
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
        setIsLoading(true);
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
        setIsLoading(true);
      });
    fetch(
      `http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/feature/findAll`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setFeatures(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
  }, [images]);

  const deleteImage = (e) => {
    setImages((oldArray) => oldArray.filter((img, index) => index !== e));
    setImagesUpload((oldArray) => oldArray.filter((img, index) => index !== e));
  };
  const createProduct = async (images) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + AuthService.getCurrentUser().jwt
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: inputTitle,
      description: inputDescription,
      introduction: inputIntroduction,
      slogan: inputSlogan,
      features: inputFeatures,
      city: inputCity,
      address: inputAddress,
      category: inputCategory,
      images: images,
      active: true,
      policies: [
        {
          rules: inputPolicesRules,
          health: inputPolicesHealth,
          /*cancellation: inputPolicesCancellation*/
        },
      ],
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const res = await fetch(
        "http://grupo4bookingdigital-env.eba-gkwgucam.us-east-2.elasticbeanstalk.com/api/product/create",
        requestOptions
      );
      return res.json();
    } catch (e) {
      
    }
  };
  const handleUpload = async (files) => {
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: process.env.REACT_APP_DIR_NAME + "/" + inputTitle,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    let res = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const data = await uploadFile(files[i], config);
        res.push({ url: data.location, title: data.key });
      } catch (err) {
        
      }
    }
    return res;
  };
  const [alertCity, setAlertCity] = useState("");
  const [alertCategory, setAlertCategory] = useState("");

  useEffect(() => {
    if (inputCity) {
      setAlertCity("");
    }
    if (inputCategory) {
      setAlertCategory("");
    }
    if (images.length >= 5) {
      setImagesClass("");
    }
    if (applyValidations && images.length < 5) {
      setImagesClass("invalid-input-images");
    }
  }, [inputCategory, inputCity, images]);

  const deleteBuffer = () => {
    setImages([]);
    setImagesUpload([]);
    setInputCategory("");
    setInputTitle("");
    setInputDescription("");
    setInputIntroduction("");
    setInputSlogan("");
    setInputCity("");
    setInputAddress("");
    setInputFeatures([]);
    setInputPolicesRules("");
    setInputPolicesHealth("");
    setInputPolicesCancellation("");
  };
  const changeInputTitle = (e) => {
    //validacion si hiciera falta.
    setInputTitle(e.target.value);
  };
  const changeInputAddress = (e) => {
    //validaciones si hiciera falta
    setInputAddress(e.target.value);
  };
  const changeInputSlogan = (e) => {
    //validaciones
    setInputSlogan(e.target.value);
  };
  const changeInputCategory = (e) => {
    //validaciones
    setInputCategory({ id: e.target.value });
  };
  const changeInputCity = (e) => {
    //validaciones
    setInputCity({ id: e.target.value });
  };
  const changeInputIntroduction = (e) => {
    //validaciones
    setInputIntroduction(e.target.value);
  };
  const changeInputDescription = (e) => {
    //validaciones
    setInputDescription(e.target.value);
  };
  const changeInputFeatures = (id) => {
    if (!inputFeatures.find((num) => num.id === id)) {
      setInputFeatures((oldArray) => [...oldArray, { id: id }]);
    } else {
      setInputFeatures((oldArray) => oldArray.filter((num) => num.id !== id));
    }
  };
  const changeInputPolicesRules = (e) => {
    //
    setInputPolicesRules(e.target.value);
  };
  const changeInputPolicesHealth = (e) => {
    //
    setInputPolicesHealth(e.target.value);
  };
  const changeInputPolicesCancellation = (e) => {
    //
    setInputPolicesCancellation(e.target.value);
  };

  const [errorClass, setErrorClass] = useState("");
  const [titleClass, setTitleClass] = useState("");
  const [addressClass, setAddressClass] = useState("");
  const [cityClass, setCityClass] = useState("");
  const [categoryClass, setCategoryClass] = useState("");
  const [sloganClass, setSloganClass] = useState("");
  const [introductionClass, setIntroductionClass] = useState("");
  const [descriptionClass, setDescriptionClass] = useState("");
  const [rulesClass, setRulesClass] = useState("");
  const [healthClass, setHealthClass] = useState("");
  const [cancellationClass, setCancellationClass] = useState("");
  const [imagesClass, setImagesClass] = useState("");

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo es obligatorio!
        </div>
      );
    }
  };
  const vtitle = (value) => {
    if (value.length < 3 || value.length > 100) {
      setTitleClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El nombre debe tener entre 3 y 10 caracteres.
        </div>
      );
    } else {
      setTitleClass("");
    }
  };
  const vaddress = (value) => {
    if (value.length < 4 || value.length > 100) {
      setAddressClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La dirección debe tener entre 4 y 100 caracteres.
        </div>
      );
    } else {
      setAddressClass("");
    }
  };
  const vslogan = (value) => {
    if (value.length < 5 || value.length > 100) {
      setSloganClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          El slogan debe tener entre 5 y 100 caracteres.
        </div>
      );
    } else {
      setSloganClass("");
    }
  };
  const vintroduction = (value) => {
    if (value.length < 10 || value.length > 500) {
      setIntroductionClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La introdución debe tener entre 10 y 500 caracteres.
        </div>
      );
    } else {
      setIntroductionClass("");
    }
  };
  const vdescription = (value) => {
    if (value.length < 10 || value.length > 1000) {
      setDescriptionClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          La descripción debe tener entre 10 y 1000 caracteres.
        </div>
      );
    } else {
      setDescriptionClass("");
    }
  };
  const vrules = (value) => {
    if (value.length < 10 || value.length > 300) {
      setRulesClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          "Normas de la casa" debe tener entre 10 y 300 caracteres.
        </div>
      );
    } else {
      setRulesClass("");
    }
  };
  const vhealth = (value) => {
    if (value.length < 10 || value.length > 300) {
      setHealthClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          "Salud y seguridad" debe tener entre 10 y 300 caracteres.
        </div>
      );
    } else {
      setHealthClass("");
    }
  };
  const vcancellation = (value) => {
    if (value.length < 10 || value.length > 300) {
      setCancellationClass("invalid-input");
      return (
        <div className="alert alert-danger" role="alert">
          "Política de cancelación" debe tener entre 10 y 300 caracteres.
        </div>
      );
    } else {
      setCancellationClass("");
    }
  };

  const form = useRef(null);
  const checkBtn = useRef(null);
  const [successful, setSuccessful] = useState(false);
  const [applyValidations, setApplyValidations] = useState(false);
  const handleProduct = async () => {
    setTitleClass("");
    setAddressClass("");
    setCityClass("");
    setCategoryClass("");
    setSloganClass("");
    setIntroductionClass("");
    setDescriptionClass("");
    setRulesClass("");
    setHealthClass("");
    setCancellationClass("");
    setImagesClass("");
    //primero subimos las imagenes
    const resImagesUpload = await handleUpload(imagesUpload);
    //Ahora si puedo crear producto
    const resCreateProduct = await createProduct(resImagesUpload);
    if (resCreateProduct) {
      deleteBuffer();
    }
  };
  const confirmCreateProduct = (e) => {
    e.preventDefault();
    setApplyValidations(true);
    setTitleClass("invalid-input");
    setAddressClass("invalid-input");
    setCityClass("invalid-input");
    setCategoryClass("invalid-input");
    setSloganClass("invalid-input");
    setIntroductionClass("invalid-input");
    setDescriptionClass("invalid-input");
    setRulesClass("invalid-input");
    setHealthClass("invalid-input");
    setCancellationClass("invalid-input");
    if (images.length < 5) {
      setImagesClass("invalid-input-images");
    }
    if (!inputCity) {
      setAlertCity("invalid-input");
    }
    if (!inputCategory) {
      setAlertCategory("invalid-input");
    }
    setSuccessful(false);
    form.current.validateAll();
    if (images.length >= 5) {
      if (checkBtn.current.context._errors.length === 0) {
        Swal.fire({
          title: "Deseas crear el producto?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, deseo crear el producto!",
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            handleProduct();
            Swal.fire({
              title: "¡Muchas gracias!",
              text: "El producto se ha creado con éxito",
              icon: "success",
              imageWidth: 150,
              imageHeight: 150,
              imageAlt: "Success",
              confirmButtonColor: "#f0572d",
              confirmButtonText: "Volver al inicio",
              focusConfirm: false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          }
        });
      }
    }
  };

  return (
    <section className="createProduct-view">
      {!isLoading ? (
        <>
          <div className="top-container">
            <div className="top">
              <div className="admin-title">
                <h4>Admin</h4>
                <h2>Administracion de productos</h2>
              </div>
              <div className="back-home">
                <Link to={"/"}>
                  <i className="fa-solid fa-chevron-left"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="main-container">
            <h3>Crear propiedad</h3>
            <Form ref={form}>
              {!successful && (
                <>
                  <div className="form-container">
                    <div className="create-product-form-row">
                      <div className="field">
                        <label htmlFor="name">Nombre de la propiedad</label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={inputTitle}
                          onChange={changeInputTitle}
                          validations={[required, vtitle]}
                          className={titleClass + " " + errorClass}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="address">Dirección</label>
                        <Input
                          id="address"
                          type="text"
                          name="address"
                          value={inputAddress}
                          onChange={changeInputAddress}
                          validations={[required, vaddress]}
                          className={addressClass + " " + errorClass}
                        />
                      </div>
                    </div>
                    <div className="create-product-form-row">
                      <div className="field">
                        <label htmlFor="city">Ciudad</label>
                        <select
                          name="city"
                          id="city"
                          defaultValue={inputCity ? inputCity : "DEFAULT"}
                          onChange={changeInputCity}
                          className={alertCity}
                        >
                          <option value="DEFAULT" hidden>
                            Seleccione una ciudad
                          </option>
                          {cities.map((e) => {
                            return (
                              <option key={e.id + "k"} value={e.id}>
                                {e.name}, {e.country}
                              </option>
                            );
                          })}
                        </select>
                        {alertCity === "invalid-input" ? (
                          <div
                            className="alert-select alert-danger"
                            role="alert"
                          >
                            Este campo es obligatorio!
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="field">
                        <label htmlFor="category">Categoria</label>
                        <select
                          name="category"
                          id="category"
                          defaultValue={
                            inputCategory ? inputCategory : "DEFAULT"
                          }
                          onChange={changeInputCategory}
                          className={alertCategory}
                        >
                          <option value="DEFAULT" hidden>
                            Seleccione una categoria
                          </option>
                          {categories.map((e) => {
                            return (
                              <option key={e.id + "k"} value={e.id}>
                                {e.title}
                              </option>
                            );
                          })}
                        </select>
                        {alertCategory === "invalid-input" ? (
                          <div
                            className="alert-select alert-danger"
                            role="alert"
                          >
                            Este campo es obligatorio!
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="field">
                        <label htmlFor="slogan">Slogan</label>
                        <Input
                          id="slogan"
                          type="text"
                          name="slogan"
                          value={inputSlogan}
                          onChange={changeInputSlogan}
                          validations={[required, vslogan]}
                          className={sloganClass + " " + errorClass}
                        />
                      </div>
                    </div>
                    <div className="field introduction">
                      <label htmlFor="introduction">Introdución</label>
                      <Textarea
                        id="introduction"
                        name="introduction"
                        value={inputIntroduction}
                        onChange={changeInputIntroduction}
                        validations={[required, vintroduction]}
                        className={introductionClass + " " + errorClass}
                      />
                    </div>
                    <div className="field description">
                      <label htmlFor="description">Descripción</label>
                      <Textarea
                        id="description"
                        name="description"
                        value={inputDescription}
                        onChange={changeInputDescription}
                        validations={[required, vdescription]}
                        className={descriptionClass + " " + errorClass}
                      />
                    </div>
                  </div>
                  <h3>Agregar atributos</h3>
                  <div className="features-container">
                    {features.map((item, index) => {
                      return (
                        <div key={index + item} className="feature">
                          <input
                            type="checkbox"
                            id={item.name}
                            name={item.name}
                            onChange={() => changeInputFeatures(item.id)}
                          />
                          <label htmlFor={item.name}>{item.name}</label>
                        </div>
                      );
                    })}
                  </div>
                  <h3>Políticas del producto</h3>
                  <div className="details-container">
                    <div className="detail">
                      <label htmlFor="rules">Normas de la casa</label>
                      <Textarea
                        id="rules"
                        name="rules"
                        value={inputPolicesRules}
                        onChange={changeInputPolicesRules}
                        validations={[required, vrules]}
                        className={rulesClass + " " + errorClass}
                      />
                    </div>
                    <div className="detail">
                      <label htmlFor="health">Salud y seguridad</label>
                      <Textarea
                        id="health"
                        name="health"
                        value={inputPolicesHealth}
                        onChange={changeInputPolicesHealth}
                        validations={[required, vhealth]}
                        className={healthClass + " " + errorClass}
                      />
                    </div>
                    <div className="detail">
                      <label htmlFor="cancellation">
                        Política de cancelación
                      </label>
                      <Textarea
                        id="cancellation"
                        name="cancellation"
                        value={inputPolicesCancellation}
                        onChange={changeInputPolicesCancellation}
                        validations={[required, vcancellation]}
                        className={cancellationClass + " " + errorClass}
                      />
                    </div>
                  </div>
                  <h3>Cargar imágenes</h3>
                  <div className="img-container">
                    {images.length < 5 && applyValidations ? (
                      <div className="alert-images alert-danger" role="alert">
                        {images.length > 0
                          ? `Agregue 5 fotos minimo (${
                              5 - images.length
                            } fotos más)`
                          : "Este campo es obligatorio!"}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="img-field">
                      {/*ACA SE SUBE IMAGENES DEL PRODUCTO AL BUCKET */}
                      <UploadImageS3
                        setImagesPrevious={setImages}
                        setImagesFiles={setImagesUpload}
                        imagesFiles={imagesUpload}
                        borderClass={imagesClass}
                      />
                      {images.length !== 0 ? (
                        <div>
                          {images.map((image, index) => {
                            return (
                              <div key={index + "k"} className="images-list">
                                <img
                                  className="createProduct-img-sample"
                                  key={index + image}
                                  src={image.img}
                                  alt="SampleIMG"
                                  height="150px"
                                  width="250px"
                                />
                                <p>{image.name}</p>
                                <div className="admin-options">
                                  <i
                                    className="fa-solid fa-trash"
                                    onClick={() => deleteImage(index)}
                                  ></i>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="createProduct-button">
                    <button onClick={confirmCreateProduct}>Crear producto</button>
                  </div>
                </>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </>
      ) : (
        <div className="booking-loading">
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/4400319/loading_crescor_dribbble.gif"
            alt="CategoryLoader"
          />
        </div>
      )}
    </section>
  );
}
