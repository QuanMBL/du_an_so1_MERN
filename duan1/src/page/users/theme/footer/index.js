import { memo } from "react"
import "./style.scss";
import { Link } from "react-router-dom";
import { FaFacebookF, FaRegUserCircle,FaInstagram } from "react-icons/fa";

// trang tổng hợp để chứa các định tuyến 
const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container"> 
                    <div className="row">
                        <div className="col-6">
                            <div className="footer_about">
                                <h1>Logo</h1>
                                <ul>
                                    <li>Địa chỉ: TPHCM</li>
                                    <li>SDT: 123456789</li>
                                    <li>Email: quan@gamil.com</li>
                                </ul>
                            </div>
                        </div>
                       
                        <div className="col-6">
                            <div className="footer_contact">
                                <h1>Liên Hệ</h1>
                                <ul>
                                    <li><Link><FaFacebookF /><span>quannguyen@@</span></Link></li>
                                    <li><Link><FaInstagram /><span>@quannnn</span></Link></li>
                                    <li><Link><FaRegUserCircle /><span>Quan@gmail.com</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    );
}

export default memo(Footer)