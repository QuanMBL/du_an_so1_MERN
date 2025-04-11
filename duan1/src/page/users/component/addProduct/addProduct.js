
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addProduct.scss";
import toast from 'react-hot-toast'
export const AddProduct = () => {
    const users ={
        name: "",
        email: "",
        address: ""
    }
    const [user,setUser] = useState(users)
    const navigate = useNavigate();

    // phần input nhập vào
    const inputHandler = (e)=>{ // tìm hiểu liên kết 
        const{name, value} = e.target // target là lấy dữ liệu
        setUser({...user,[name]:value}); // [mở rộng hàm, thêm dữ liệu]
        /* 
        giải thích  setUser({...user,[name]:value})
        {
        ...user: đây là dữ liệu đã nhập từ trước,
        [name]:value   name lấy từ input và value là dữ liệu từ bàn phím 
        }
        */
    }

    const handleSubmit = async (e) => {
        e.preventDefault();//ngăn cho trang không bị reload lúc nhập dữ liệu
        await axios.post("http://localhost:7000/api/product",user).then((response)=>{
            toast.success(response.data.message,{position:"top-right"})
            navigate("/")
        }).catch((e)=>{
            console.log("lỗi",e)
        });

    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSubmit} className="signin-form">
                <h2>Thêm Sản Phẩm</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="name"
                    onChange={inputHandler}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="image"
                    onChange={inputHandler}
                    required
                />
                <input
                    type="text"
                    name="price"
                    placeholder="price"
                    onChange={inputHandler}
                    required
                />
                <button type="submit">Thêm</button>
              
            </form>
        </div>
    )
}
