import { memo, useState } from "react";
import "./style.scss";
import { FaFacebookF, FaInstagram, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ROUTERS } from "util/router";

// trang tổng hợp để chứa các định tuyến
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const [menus, setMenu] = useState([
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Cửa Hàng",
      path: "",
    },
    {
      name: "Sản phẩm",
      path: "",
      isShowSubmenu: false,
      child: [
        {
          name: "Máy 1",
          path: "",
        },
        {
          name: "Máy 2",
          path: "",
        },
        {
          name: "Máy 3",
          path: "",
        },
      ],
    },

    {
      name: "Bài viết",
      path: "",
    },
    {
      name: "Liên hệ",
      path: "",
    },
  ]);
  return (
    <>
      {/* <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header-top-left">
                            <ul>
                                <li>quan@123.gmail</li>
                                <li>Sale đây</li>
                            </ul>
                        </div>
                        <div className="col-6 header-top-right">
                            <ul>
                                <li><FaFacebookF /></li>
                                <li><FaInstagram /></li>
                                <li><FaRegUserCircle /> <span>Đăng nhập</span></li>

                            </ul>
                        </div>
                    </div>
                </div>

            </div> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-log-3">
            <div className="header_logo">
              <h1>LoGo</h1>
            </div>
          </div>
          <div className="col-xl-3 col-xl-6">
            <div className="header_menu">
              <ul className="header_menu_ul">
                {menus.map((e, i) => (
                  <li className="header_menu_li" key={i}>
                    <Link className="header_menu_link">{e.name}</Link>
                    {e.name === "Sản phẩm" && e.child && (
                      <ul className="header_menu_product">
                        {e.child.map((child, index) => (
                          <li
                            className="List_menu_product"
                            key={`child-${index}`}
                          >
                            <Link>{child.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-xl-3 col-log-3">
            <div className="header_cart">
              <div className="header_cart_price">
                <Link to="/signin" className="btn_log">
                  <FaRegUserCircle />{" "}
                  {user ? (role === "admin" ? "Admin" : "User") : "Đăng nhập"}
                </Link>
              </div>
              <ul>
                <li>
                  <Link to="/cart">
                    {" "}
                    <AiOutlineShoppingCart />
                  </Link>
                  <span>0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row category_container">
          <div className="col-log-3">
            <div className="category_all">
              <span>Danh sách sản phẩm</span>
              <ul>
                <li>
                  <Link>HP</Link>
                </li>
                <li>
                  <Link>MacBook</Link>
                </li>
                <li>
                  <Link>Dell</Link>
                </li>
                <li>
                  <Link>ASUS</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-log-9 search_container">
            <div className="search_form">
              <input type="search" placeholder="Nhập sản phẩm"></input>
              <button type="submit">🔍</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);

/* 

       
*/
