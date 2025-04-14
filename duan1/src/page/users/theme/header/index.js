import { memo, useState } from "react";
import "./style.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ROUTERS } from "util/router";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const [menus] = useState([
    { name: "Trang chủ", path: ROUTERS.USER.HOME },
    { name: "Cửa Hàng", path: "" },
    {
      name: "Sản phẩm",
      path: "",
      isShowSubmenu: false,
      child: [
        { name: "Máy 1", path: "" },
        { name: "Máy 2", path: "" },
        { name: "Máy 3", path: "" },
      ],
    },
    { name: "Bài viết", path: "" },
    { name: "Liên hệ", path: "" },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // ngăn reload trang
    if (searchValue.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue(""); // reset ô tìm kiếm
    }
  };

  return (
    <>
      <div className="container header-main">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-3">
            <div className="header_logo">
              <Link to="/">
                <h1>LoGo</h1>
              </Link>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="header_menu">
              <ul className="header_menu_ul">
                {menus.map((e, i) => (
                  <li className="header_menu_li" key={i}>
                    <Link className="header_menu_link" to={e.path}>
                      {e.name}
                    </Link>
                    {e.name === "Sản phẩm" && e.child && (
                      <ul className="header_menu_product">
                        {e.child.map((child, index) => (
                          <li
                            className="List_menu_product"
                            key={`child-${index}`}
                          >
                            <Link to={child.path}>{child.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="header_cart">
              <div className="header_cart_price">
                <Link to="/signin" className="btn_log">
                  <FaRegUserCircle />
                  {user ? (role === "admin" ? "Admin" : "User") : "Đăng nhập"}
                </Link>
              </div>
              <ul>
                <li>
                  <Link to="/cart">
                    <AiOutlineShoppingCart />
                  </Link>
                  <span>💖</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container category-search-container">
        <div className="row">
          <div className="col-lg-3">
            <div className="category_all">
              <span>Danh sách sản phẩm</span>
              <ul>
                <li>
                  <Link to="/category/HP">HP</Link>
                </li>
                <li>
                  <Link to="/category/MacBook">MacBook</Link>
                </li>
                <li>
                  <Link to="/category/Dell">Dell</Link>
                </li>
                <li>
                  <Link to="/category/ASUS">ASUS</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-9">
            {/* Row cho input tìm kiếm */}
            <div className="row">
              <div className="col-lg-12 search_form">
                <form onSubmit={handleSearch} className="search_form">
                  <input
                    type="search"
                    placeholder="Nhập sản phẩm" 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button type="submit">🔍</button>
                </form>
              </div>
            </div>

            {/* Row mới cho banner => SẼ NẰM DƯỚI */}
            <div className="row">
              <div className="col-lg-12">
                <div className="promo-banner background-image-banner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
