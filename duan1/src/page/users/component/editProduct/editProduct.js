import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./edit-product.scss"; // dùng file SCSS riêng

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category:"",
    image: "",
    price: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:7000/api/product/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/api/update/product/${id}`, product);
      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="container editForm">
      <div className="edit-product">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit} className="edit-product__form">
          <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
          <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
          <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image path (e.g., hp/anh1.png)" required />
          <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>

  );
};

export default EditProduct;
