import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-grid";
import { fetchDataAll } from "../../helpers/query";
import { GlobalContext } from "../../context/Provider";
import DriverCard from "../../components/grid/driverCard";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

function ListProfileDriver() {
  const [data, setData] = useState([]);

  const {
    authState: { user },
  } = useContext(GlobalContext);
  // Calling the function on component mount
  const loadData = () => {
    fetchDataAll("driver/findAllAssignedDrivers")((driver) => {
      setData(driver);
    })((err) => {
      toast.error(err.message);
    });
  };
  useEffect(() => {
    let controller = new AbortController();
    loadData();
    return () => controller?.abort();
  }, []);

  return (
    <>
      <MainLayout>
        {data.length > 0 ? (
          <div className="container mt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <Container fluid className="grid">
                  <Row>
                    {data
                      .filter(
                        (item) =>
                          item?.Vehicles[0]["AssignDrivers"].Assigned === true
                      )
                      .map((item, index) => (
                        <Col key={item.DriverId} className="col-lg-6 ">
                          <DriverCard driver={item} />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        ) : (
          <h4 className="alert alert-info">No driver record found</h4>
        )}
      </MainLayout>
    </>
  );
}

//Login.layout = "main";
//export default ListProfileDriver;

export default dynamic(() => Promise.resolve(ListProfileDriver), {
  ssr: false,
});
