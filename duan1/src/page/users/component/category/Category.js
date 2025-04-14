import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./category.scss";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/products/category/${name}`)
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, [name]);

  return (
    <div className="hot-products">
      <div className="section-title">
        <h2>Sản phẩm thuộc loại: {name}</h2>
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} VND</p>
            </div>
          ))
        ) : (
          <p className="no-product-msg">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
  
};

export default Category;
