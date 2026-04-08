import React, { useEffect, useState } from 'react'
import cross_icon from '../assets/cross_icon.png'
import './ListProduct.css'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }

  return (
    <div className="list-product">
      <h1>Lista e produkteve</h1>

      <div className='listproduct-format-main'>
        <p>Produkt</p>
        <p>Titulli</p>
        <p>Cmimi vjeter</p>
        <p>Cmimi ri</p>
        <p>Kategoria</p>
        <p>Hiq</p>
      </div>

      <div className='listproduct-allproduct'>
        <hr />

        {allproducts.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <div className='listproduct-format-main listproduct-format'>

                {/* ✅ FIX I IMAGJIT */}
                <img 
             src={
              product.image?.startsWith('http')
                ? product.image
                : `${import.meta.env.VITE_API_URL}${
                    product.image?.startsWith('/') ? product.image : '/' + product.image
                  }`
            }
                  alt="" 
                  className='listproduct-product-icon' 
                />

                <p>{product.name}</p>
                <p>€{product.old_price}</p>
                <p>€{product.new_price}</p>
                <p>{product.category}</p>

                <img
                  onClick={() => remove_product(product._id || product.id)}
                  className='listproduct-remove-icon'
                  src={cross_icon}
                  alt="remove"
                />

              </div>
              <hr />
            </React.Fragment>
          )
        })}

      </div>
    </div>
  )
}

export default ListProduct;