import React, { useState } from "react";
import './AddProduct.css'
import upload_area from '../assets/upload_area.svg'

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    category: "femra",
    new_price: "",
    old_price: ""
  });

  // ALERT
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // IMAGE
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // INPUT CHANGE
  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });

    // heq error sapo user fillon te shkruaje
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  // VALIDIM
  const validateForm = () => {
    let newErrors = {};

    if (!productDetails.name.trim()) {
      newErrors.name = "Vendos emrin e produktit";
    }

    if (!productDetails.old_price || isNaN(productDetails.old_price)) {
      newErrors.old_price = "Cmimi duhet te jete numer";
    }

    if (!productDetails.new_price || isNaN(productDetails.new_price)) {
      newErrors.new_price = "Cmimi oferte duhet te jete numer";
    }

    if (
      productDetails.old_price &&
      productDetails.new_price &&
      Number(productDetails.new_price) > Number(productDetails.old_price)
    ) {
      newErrors.new_price = "Cmimi oferte nuk mund te jete me i madh";
    }

    if (!image) {
      newErrors.image = "Ngarko nje imazh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ADD PRODUCT
  const Add_Product = async () => {

    if (!validateForm()) {
      showAlert("error", "Plotëso të dhënat saktë!");
      return;
    }

    setLoading(true);

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4001/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {

      product.image = responseData.image_url;

      await fetch('http://localhost:4001/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {

        setLoading(false);

        if (data.success) {
          showAlert("success", "Produkti u shtua me sukses!");

          setproductDetails({
            name: "",
            image: "",
            category: "femra",
            new_price: "",
            old_price: ""
          });

          setImage(false);
          setErrors({});
        } else {
          showAlert("error", "Shtimi dështoi!");
        }

      });

    } else {
      setLoading(false);
      showAlert("error", "Upload i imazhit dështoi!");
    }
  };

  return (
    <div className='add-product'>

      {/* ALERT */}
      {alert && (
        <div className={`custom-alert ${alert.type}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert(null)}>×</button>
        </div>
      )}

      {/* NAME */}
      <div className='addproduct-itemfield'>
        <p>Titulli i produktit</p>
        <input
          className={errors.name ? "input-error" : ""}
          value={productDetails.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Shkruaj këtu'
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      {/* PRICES */}
      <div className="addproduct-price">

        <div className='addproduct-itemfield'>
          <p>Cmimi</p>
          <input
            className={errors.old_price ? "input-error" : ""}
            value={productDetails.old_price}
            onChange={changeHandler}
            type='text'
            name='old_price'
            placeholder='Shkruaj këtu'
          />
          {errors.old_price && <p className="error-text">{errors.old_price}</p>}
        </div>

        <div className='addproduct-itemfield'>
          <p>Cmimi Oferte</p>
          <input
            className={errors.new_price ? "input-error" : ""}
            value={productDetails.new_price}
            onChange={changeHandler}
            type='text'
            name='new_price'
            placeholder='Shkruaj këtu'
          />
          {errors.new_price && <p className="error-text">{errors.new_price}</p>}
        </div>

      </div>

      {/* CATEGORY */}
      <div className='addproduct-itemfield'>
        <p>Kategoria produktit</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='add-product-selector'
        >
          <option value='femra'>Femra</option>
          <option value='meshkuj'>Meshkuj</option>
          <option value='femije'>Femije</option>
        </select>
      </div>

      {/* IMAGE */}
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumbnail-img'
            alt=''
          />
        </label>
        <input
          onChange={imageHandler}
          type='file'
          name='image'
          id='file-input'
          hidden
        />
        {errors.image && <p className="error-text">{errors.image}</p>}
      </div>

      {/* BUTTON */}
      <button
        onClick={Add_Product}
        className='addproduct-btn'
        disabled={loading}
      >
        {loading ? "Duke shtuar..." : "Shto"}
      </button>

    </div>
  )
}

export default AddProduct;