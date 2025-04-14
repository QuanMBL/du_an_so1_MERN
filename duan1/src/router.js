import { Route, Routes } from "react-router-dom";
import HomePage from "./page/users/homePage";
import { ROUTERS } from "./util/router";
import MasterLayout from "./page/users/theme/masterLayout";
import ProfilePage from "./page/users/profilePage";
import Signin from "page/users/component/signin/signin";
import Signup from "page/users/component/signup/signup";
import EditProducts from "page/users/component/editProduct/editProduct"
import { AddProduct } from "page/users/component/addProduct/addProduct";
import CartPage from "page/users/component/CartPage/CartPage.js";
import Category from "page/users/component/category/Category";
import SearchPage from "page/users/component/search/Search";

const RouterCustom = () => {
  return (
    <Routes>
      {/* Routes có layout chung */}
      <Route element={<MasterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTERS.CART.CARTURL} element={<CartPage />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/search" element ={<SearchPage/>} />  
        {/* Thêm các route khác nếu muốn dùng layout */}
      </Route>

      {/* Các route KHÔNG dùng layout */}
      <Route path={ROUTERS.LOGIN.SIGNIN} element={<Signin />} />
      <Route path={ROUTERS.REGISTER.SIGNUP} element={<Signup />} />
      <Route path={ROUTERS.ADDPRODUCT.ADD} element={<AddProduct />} />
      <Route path="/editProduct/:id" element={<EditProducts />} />
         
    </Routes>
  );
};

export default RouterCustom;
