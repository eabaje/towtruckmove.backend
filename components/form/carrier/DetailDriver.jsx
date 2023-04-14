import React from "react";
import UploadImages from "../../upload/image-upload";

const DetailDriver = ({ query }) => {
  const { driverId, vehicleId } = query;
  const [profile, setProfile] = useState({});
  const [refId, setRefId] = useState();

  const {
    authState: { user },
  } = useContext(GlobalContext);
  // Calling the function on component mount
  useEffect(() => {
    fetchData(
      "driver/findOneAssigned",
      driverId
    )((driver) => {
      setProfile(driver);
      setRefId(driver?.Vehicles[0].VehicleId);
      console.log(driver?.Vehicles[0].VehicleId);
      //   for(var key in driver?.Vehicles) {
      //     // examples

      //     console.log( driver[key]["Vehicles"].VehicleId );
      //  }
    })((err) => {
      enqueueSnackbar(err.message, { variant: "error" });
    });
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm();

  const {
    shipmentDispatch,
    shipmentState: {
      createShipment: { error, loading },
    },
  } = useContext(GlobalContext);

  function onRequestDriverService(formdata) {
    formdata.Email = profile?.Email;
    console.log("fromPasword", formdata);
    AssignShipmentsToDriver(formdata)(shipmentDispatch)((res) => {
      enqueueSnackbar(`Updated  Password successfully`, {
        variant: "success",
      });
    })((error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    });
  }

  console.log("data", profile);
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header alert alert-info">
          <h3>Connect with Driver </h3>
          <hr />
          <ul>
            <li>View the driver Profile</li>
            <li>Check the truck images </li>
            <li>Send a request </li>
          </ul>
        </div>
        <div className="card-body table-border-style">
          <div className="container">
            <div className="row">
              {/* <!-- [ accordion-collapse ] start --> */}
              <div className="col-sm-12">
                <div className="accordion" id="accordionExample">
                  <div className="card mb-0">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Profile
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card user-card">
                        <div className="card-block">
                          <div className="user-image">
                            <img
                              src={
                                profile?.PicUrl
                                  ? IMG_URL + profile?.PicUrl
                                  : "https://bootdey.com/img/Content/avatar/avatar7.png"
                              }
                              className="img-radius"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 className="f-w-600 m-t-25 m-b-10">
                            {profile?.DriverName}
                          </h6>
                          <h6 className="f-w-600 m-t-25 m-b-10">
                            {profile?.Company?.CompanyName}
                          </h6>
                          <h7 className="f-w-600 m-t-25 m-b-10">
                            {profile?.Address}
                            {profile?.Vehicles?.map((vehicles) => (
                              <>{vehicles?.VehicleId}</>
                            ))}
                          </h7>
                          <p className="text-muted">
                            {profile?.IsActivated && "Active"}
                            {profile?.DOB && "| Born " + profile?.DOB}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-0">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Check Vehicle
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="col-md-12 ">
                          <UploadImages
                            title={"Check pictures of vehicle"}
                            refId={vehicleId}
                            role={user?.roles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingFour">
                      <h5 className="mb-0">
                        <a
                          href="#!"
                          className="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Any Interest
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <form onSubmit={handleSubmit(onRequestDriverService)}>
                          <input
                            type="hidden"
                            name="Email"
                            value={profile?.Email}
                            className="form-control"
                            {...register("Email")}
                          />
                          <div className="form-row">
                            <div className="col-sm-10 ">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="invalidCheck"
                                  required
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="invalidCheck"
                                >
                                  I am interested in engaging your services
                                </label>
                                <div className="invalid-feedback">
                                  You must agree before submitting.
                                </div>
                              </div>
                            </div>
                            <div className="right" style={{ float: "right" }}>
                              <button
                                type="submit"
                                className="btn  btn-primary"
                                style={{ float: "right" }}
                              >
                                {loading ? (
                                  <i className="fa fa-spinner fa-spin"></i>
                                ) : (
                                  <i className="feather mr-2 icon-check-circle"></i>
                                )}
                                {"Submit "}
                              </button>
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="col-sm-10 "></div>
                            <div
                              className="right"
                              style={{ float: "right" }}
                            ></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- [ accordion-collapse ] end --> */}
            </div>
          </div>

          <div className="table-responsive">
            {/* <DataTableExtensions {...tableData}> 
          <DataTableExtensions exportHeaders columns={columns} data={data}>
            <DataTable
              columns={columns}
              data={data}
              className="table table-striped table-bordered table-hover table-checkable"
              defaultSortField={1}
              sortIcon={<ChevronsDown />}
              defaultSortAsc={true}
              pagination
              highlightOnHover
            />
          </DataTableExtensions>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDriver;
