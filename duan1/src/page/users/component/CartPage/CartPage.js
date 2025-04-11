import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartPage.scss";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "67f4a410c0113faf435df7fe"; // Hoặc lấy từ localStorage nếu có đăng nhập

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/carts?userId=${userId}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      });
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item?.productId?.price.replace(/\./g, '')) || 0;
    const quantity = parseInt(item?.quantity || 0);
    return total + price * quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Hiện chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => {
              const price = parseFloat(item.productId.price.replace(/\./g, '')) || 0;
              const quantity = parseInt(item.quantity || 0);
              const total = price * quantity;

              return (
                <div className="cart-item" key={item._id}>
                  <img src={`/${item.productId.image}`} alt={item.productId.name} />
                  <div className="info">
                    <h4>{item.productId.name}</h4>
                    <p><strong>Số lượng:</strong> {quantity}</p>
                    <p><strong>Giá:</strong> {price.toLocaleString("vi-VN")}₫</p>
                    <p><strong>Thành tiền:</strong> {total.toLocaleString("vi-VN")}₫</p>
                    <p>
                      <strong>Ngày thêm:</strong>{" "}
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Tổng tiền: {totalPrice.toLocaleString("vi-VN")}₫</h3>
            <button className="checkout-btn">Thanh toán</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
