import Product from "../model/ProductModel.js";
import Role from "../model/LogninModel.js";
import CartItem from "../model/CartItem.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const { name, image, price } = req.body;

    // Nếu không có ảnh, gán ảnh mặc định
    const productImage = image ? `${image}` : "assets/users/images/default.jpg";
    // Kiểm tra sản phẩm đã tồn tại chưa
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Product already exists." });
    }

    // Tạo sản phẩm mới
    const newProduct = new Product({ name, image: productImage, price });
    const saveData = await newProduct.save();
    res.status(201).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Lấy tất cả sản phẩm
export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Cập nhật sản phẩm theo ID
/* export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, price } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Cập nhật dữ liệu
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, image: image || product.image, price },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}; */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price } = req.body;
    const productImage = image ? `${image}` : "assets/users/images/default.jpg";

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, image: productImage, price },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Xóa sản phẩm theo ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Xóa tất cả sản phẩm
export const deleteAllProducts = async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany({});
    res.status(200).json({
      message: `${deletedProducts.deletedCount} products deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// dùng riêng cho user Lognin
//tìm kiếm xác nhận người dùng có trong hệ thống
/* export const createUser = async (req, res) => { // req là yêu cầu, res(response) là Phản hồi
    try {
        const newUser = new Role(req.body); // tạo đối tượng mới mà client gửi đến server --> khi nó thực hiện lời yêu cầu đến server như PUT POST PATCH
        //VD dễ hiểu Nếu bạn nhập xong 1 from đăng ký (client).
        //thì khi ấn gửi nó sẽ đưa lên server và server sẽ nhận dữ liệu này để xử lý nó 

        const { email } = newUser; // tạo 1 đối tượng gán cho newUser

        const userExist = await Role.findOne({ email }) // đợi tìm kiếm có email nào giống vậy tồn tại trong 
        if (userExist) { // nếu nó có tồn tại thì sẽ đưa về thông báo đã tồn tại
            return res.status(400).json({ message: "User already exists." }) // req sai 
        }

        const saveData = await newUser.save(); // không tồn tại thì lưu 
        res.status(200).json(saveData) //đây là dạng mà mà htpp sẽ biết và khi tới mã đó bạn có thể lưu --> 200
    } catch (error) {
        res.status(500).json({ errorMessage: error.message }) // 500 là thuộc khoảng Lỗi phía server
    }
}
 */

export const signup = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new Role({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Role.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    const bcrypt = await import("bcrypt");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

    return res.json({
      message: "Đăng nhập thành công",
      token,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const roles = await Role.find();
    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "No roles found." });
    }
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

/////////////////////
export const addCart = async (req, res) => {
  try {
    console.log("👉 Nhận từ client:", req.body);
    const { userId, productId, quantity } = req.body;
    
    // Kiểm tra xem có đủ thông tin không
    if (!userId || !productId) {
      return res.status(400).json({ message: "Thiếu userId hoặc productId" });
    }

    // Tạo cart item
    const newCart = new CartItem({
      userId,
      productId,
      quantity: quantity || 1
    });

    // Lưu vào MongoDB
    await newCart.save();

    res.status(201).json({ message: "Đã thêm sản phẩm vào giỏ hàng", cartItem: newCart });
  } catch (err) {
    console.error("Lỗi thêm vào giỏ hàng:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.query; // vẫn dùng query, nhưng không bắt buộc

  try {
    // Nếu có userId thì lọc, còn không thì lấy tất cả
    const filter = userId ? { userId } : {};
    const cart = await CartItem.find(filter).populate("productId");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCart = await CartItem.findByIdAndDelete(id);

    if (!deletedCart) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mục trong giỏ hàng" });
    }

    res.status(200).json({ message: "Đã xóa khỏi giỏ hàng" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi xóa mục giỏ hàng" });
  }
};

export const deleteCartAll = async (req, res) => {
  try {
    const deleteCart = await CartItem.deleteMany({});
    res.status(200).json({
      message: `${deleteCart.deletedCount} products deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};