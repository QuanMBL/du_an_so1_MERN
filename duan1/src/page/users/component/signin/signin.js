import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";// 👈 THÊM DÒNG NÀY
import "./style.scss";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/login",
        formData
      );
      const { token, username, role } = response.data;

      // ✅ Giải mã token để lấy _id
      const decoded = jwtDecode(token);
      const _id = decoded.id; // 👈 lấy id từ token (trùng _id của user trong MongoDB)

      // ✅ Lưu user đầy đủ vào localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ username, role, token, _id })
      );

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng nhập</button>
        <p>
          Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
