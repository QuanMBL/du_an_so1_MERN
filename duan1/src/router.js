import { Route, Routes } from "react-router-dom";
import HomePage from "./page/users/homePage";
import { ROUTERS } from "./util/router";
import MasterLayout from "./page/users/theme/masterLayout";
import ProfilePage from "./page/users/profilePage";
import Signin from "page/users/component/signin/signin";
import Signup from "page/users/component/signup/signup";
import EditProducts from "page/users/component/editProduct/editProduct"
import { AddProduct } from "page/users/component/addProduct/addProduct";
import CartPage from "page/users/component/CartPage/CartPage.js"

const RouterCustom = () => {
    return (
        <Routes>
            {/* Các route dùng MasterLayout */}
            <Route path="/"
                element={
                    <MasterLayout>
                        <HomePage />
                    </MasterLayout>
                }
            />
            <Route
                path={ROUTERS.USER.PROFILE}
                element={
                    <MasterLayout>
                        <ProfilePage />
                    </MasterLayout>
                }
            />

            {/* Các route KHÔNG dùng layout */}
            <Route path={ROUTERS.LOGIN.SIGNIN} element={<Signin />} />
            <Route path={ROUTERS.REGISTER.SIGNUP} element={<Signup />} />
            <Route path={ROUTERS.ADDPRODUCT.ADD} element={<AddProduct />} />
            <Route path={ROUTERS.CART.CARTURL} element={<CartPage />} />
            <Route path= "/editProduct/:id" element={<EditProducts/>}/>
        </Routes>
    );
};

export default RouterCustom;
