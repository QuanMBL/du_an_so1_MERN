
// Trang route này thể hiện cho đường dẫn 
import express from "express";
import { createProduct, deleteProduct, getAll, getProductById, updateProduct,login,getAllUser,signup, addCart, getCart ,deleteCartAll, deleteCart,getProductsByCategory,ProductController} from "../controller/userController.js";


const route = express.Router();

route.post("/product",createProduct)
route.get("/products",getAll)
route.get("/product/:id",getProductById)
route.put("/update/product/:id",updateProduct)
route.delete("/delete/product/:id", deleteProduct)
route.get("/products/category/:name", getProductsByCategory);
route.get("/products/search", ProductController.searchProductByName);
// chưa hoàn thiện
route.post("/login",login)
route.post("/signup",signup)

// route.get("/lognin/check",login)
route.get("/users",getAllUser)

///
route.post("/addcart",addCart);
route.get("/carts",getCart)
route.delete("/delete/cart/:id",deleteCart)
route.delete("/delete/carts", deleteCartAll)

/* 
:id là một route parameter (tham số động của route).
Khi một request được gửi tới /Products/123, Express sẽ tự động gán 123 vào req.params.id.
Bạn có thể truy cập giá trị này trong hàm getProductById như sau:
 */


export default route