import { memo } from "react";
import Header from "../header";
import Footer from "../footer";
import { Outlet } from "react-router-dom";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      {children || <Outlet />}{" "}
      {/* chứa các route con
      VD:
    <Route element={<MasterLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/cart" element={<CartPage />} />
    </Route>

      */}
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
