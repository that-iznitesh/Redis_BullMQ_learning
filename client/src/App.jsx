import React from 'react'
import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [res, setRes] = useState(false);
  const [products, setProducts] = useState([]);

  const addhandler = async () => {
    const res=await axios.post('http://localhost:5000/api/product', {
      productName: productName,
      productPrice: productPrice
    })
if(res.data.success){
  setRes(res.data.success);
}
  }

  return (
    <>
      <label>Product Name</label>
      <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />

      <br />
      <label >Product Price</label>
      <input type="text" placeholder='Enter Product Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      <button onClick={addhandler}>Add Product</button>
      {res ? <p>Product Added Successfully</p> : null}

      <button onClick={async () => {
        const res = await axios.get('http://localhost:5000/api/getproducts');
        setProducts(res.data);
        console.log(res.data);

      }}>Get Products</button>

      {products.map((item,index)=>{
        return <p key={index}>{item.name} : {item.price}</p>
      })}

    </>
  )
}

export default App
