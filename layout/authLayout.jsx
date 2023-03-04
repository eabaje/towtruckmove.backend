import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const imgMyimageexample = require("../assets/slider_2.jpg");
// const divStyle = {
//   width: "100vw",
//   height: "100vh",
//   backgroundImage: `url(${imgMyimageexample})`,
//   backgroundSize: "cover",
// };

const AuthLayout = ({ children }) => (
  <div>
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="card">
          <div className="row align-items-center text-center">
            <div className="col-md-12">
              <div className=" card-body">
                <img
                  src="/assets/images/logo-small-prod.png"
                  alt=""
                  className="logo-main"
                />
                <h4 className="mb-3 f-w-700">Global Load Dispatch</h4>
                <ToastContainer position="top-center" />
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
