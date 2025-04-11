import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import RouterCustom from './router';
import { ToastContainer } from "react-toastify"; // ✅ thêm
import "react-toastify/dist/ReactToastify.css";  // ✅ thêm
import "./style/style.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <>
      <RouterCustom />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  </BrowserRouter>
);



/* 
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import RouterCustom from './router';
import "./style/style.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //  bọc toàn bộ ứng dụng với chức năng định tuyến 
  <BrowserRouter> 
    <RouterCustom></RouterCustom>
  </BrowserRouter>
);




 */