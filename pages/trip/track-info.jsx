import React, { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";

function Track() {
  const {
    authState: { user },
  } = useContext(GlobalContext);

  return (
    <>
      <MainLayout>
        <article className="card">
          <header className="card-header"> My Orders / Tracking </header>
          <div className="card-body">
            <h6>Order ID: OD45345345435</h6>
            <article className="card">
              <div className="card-body row">
                <div className="col">
                  {" "}
                  <strong>Estimated Delivery time:</strong> <br />
                  29 nov 2019{" "}
                </div>
                <div className="col">
                  {" "}
                  <strong>Shipping BY:</strong> <br /> BLUEDART, |{" "}
                  <i className="fa fa-phone"></i> +1598675986{" "}
                </div>
                <div className="col">
                  {" "}
                  <strong>Status:</strong> <br /> Picked by the courier{" "}
                </div>
                <div className="col">
                  {" "}
                  <strong>Tracking #:</strong> <br /> BD045903594059{" "}
                </div>
              </div>
            </article>
            <div className="track">
              <div className="step active">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-check"></i>{" "}
                </span>{" "}
                <span className="text">Order confirmed</span>{" "}
              </div>
              <div className="step active">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>{" "}
                <span className="text"> Picked by courier</span>{" "}
              </div>
              <div className="step">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-truck"></i>{" "}
                </span>{" "}
                <span className="text"> On the way </span>{" "}
              </div>
              <div className="step">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-box"></i>{" "}
                </span>{" "}
                <span className="text">Ready for pickup</span>{" "}
              </div>
            </div>
            <hr />
            <ul className="row">
              <li className="col-md-4">
                <figure className="itemside mb-3">
                  <div className="aside">
                    <img
                      src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1571751108/Ecommerce/laptop-dell-xps-15-computer-monitors-laptops.jpg"
                      className="img-sm border"
                    />
                  </div>
                  <figcaption className="info align-self-center">
                    <p className="title">
                      Dell Laptop with 500GB HDD <br /> 8GB RAM
                    </p>{" "}
                    <span className="text-muted">$950 </span>
                  </figcaption>
                </figure>
              </li>
              <li className="col-md-4">
                <figure className="itemside mb-3">
                  <div className="aside">
                    <img
                      src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1571750967/Ecommerce/ef192a21ec96.jpg"
                      className="img-sm border"
                    />
                  </div>
                  <figcaption className="info align-self-center">
                    <p className="title">
                      HP Laptop with 500GB HDD <br /> 8GB RAM
                    </p>{" "}
                    <span className="text-muted">$850 </span>
                  </figcaption>
                </figure>
              </li>
              <li className="col-md-4">
                <figure className="itemside mb-3">
                  <div className="aside">
                    <img
                      src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1571750722/Ecommerce/acer-v-17-nitro-realsense.jpg"
                      className="img-sm border"
                    />
                  </div>
                  <figcaption className="info align-self-center">
                    <p className="title">
                      ACER Laptop with 500GB HDD <br /> 8GB RAM
                    </p>{" "}
                    <span className="text-muted">$650 </span>
                  </figcaption>
                </figure>
              </li>
            </ul>
            <hr />
            <a href="#" className="btn btn-warning" data-abc="true">
              {" "}
              <i className="fa fa-chevron-left"></i> Back to orders
            </a>
          </div>
        </article>
      </MainLayout>
    </>
  );
}
//Login.layout = "main";
export default Track;
