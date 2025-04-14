import { memo, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import lattop1IMG from "assets/users/images/hp/anh1.png";
import lattop2IMG from "assets/users/images/asus/anh1.png";
import lattop3IMG from "assets/users/images/macbook/anh1.png";
import lattop4IMG from "assets/users/images/dell/anh1.png";
import lattop5IMG from "assets/users/images/hp/anh2.png";
import "./style.scss";
import axios from "axios";
import { FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // ✅ import đúng cách

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await axios.get("http://localhost:7000/api/products");
        setProduct(respone.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const sliderItem = [
    { URLImg: lattop1IMG, name: "Laptop HP 250 G9 AG2K7AT" },
    { URLImg: lattop2IMG, name: "Laptop ASUS Vivobook 14 OLED A1405VA-KM257W" },
    { URLImg: lattop3IMG, name: "Apple MacBook Air M2 2024" },
    { URLImg: lattop4IMG, name: "Laptop Dell Inspiron 15 3520" },
    { URLImg: lattop5IMG, name: "Laptop HP Gaming Victus 15" },
  ];

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.warn("Bạn cần đăng nhập");
      return;
    }
   
    let userId = null;
    try {
      const decoded = jwtDecode(token);
      userId = decoded._id || decoded.id; // tùy backend trả về là _id hay id
      
    } catch (err) {
      console.warn("❌ Lỗi giải mã token:", err);
      toast.error("Token không hợp lệ");
      return;
    }

    if (!userId) {
      toast.warn("Không tìm thấy ID người dùng trong token");
      return;
    }
    

    if (!productId) {
      toast.warn("Thiếu productId");
      return;
    }

    
    try {
      const response = await axios.post("http://localhost:7000/api/addcart", {
        userId: userId,
        productId: productId,
        quantity: 1,
      });
     

      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("❌ Lỗi khi thêm vào giỏ hàng:", error?.response?.data || error);
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };
 
  const deleteProduct = async (productId) => {
    try {
      const respone = await axios.delete(`http://localhost:7000/api/delete/product/${productId}`);
      setProduct((prevProduct) => prevProduct.filter((p) => p._id !== productId));
      toast.success(respone.data.message, { position: "top-right" });
    } catch (error) {
      console.log("❌ Lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <>
      <div className="container container_category_slider">
        <Carousel
          responsive={responsive}
          autoPlay
          autoPlaySpeed={3000}
          infinite
          showDots={false}
          className="category_slider"
        >
          {sliderItem.map((e, i) => (
            <div key={i} className="category_item">
              <div
                className="category_img"
                style={{ backgroundImage: `url(${e.URLImg})` }}
              ></div>
              <p className="category_text">{e.name}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="container hot-products">
        <div className="section-title">
          <h2>Sản Phẩm Hot</h2>
        </div>
        <div className="product-list">
          {product?.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.category}</p>
              <p className="product-price">{product.price} VND</p>

              {role === "user" && (
                <div className="cart-popup">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="add-to-cart-btn"
                  >
                    <FaShoppingCart className="cart-icon" />
                  </button>
                </div>
              )}

              {role === "admin" && (
                <div className="product-actions">
                  <Link to={`/editProduct/${product._id}`} className="edit-btn">
                    <FaEdit /> edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="delete-btn"
                  >
                    <FaTrash />
                    delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {role === "admin" && (
            <div className="product-card">
              <Link
                to="/addProduct"
                type="button"
                className="add-to-product-btn"
                title="Thêm sản phẩm"
              >
                <span className="add-span">+</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);
