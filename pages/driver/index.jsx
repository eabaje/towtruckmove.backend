import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { API_URL } from "../../constants";
import { GlobalContext } from "../../context/Provider";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../datasource/dataColumns/driver";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { PopUpClose, PopUpOpen } from "../../context/actions/user/user.action";
import CustomPopup from "../../components/popup/popup.component";
import CustomButton from "../../components/button/customButton";
import { sendDriverRegistrationLink } from "../../context/actions/driver/driver.action";
import { Modal } from "react-bootstrap";

function ListDriver({ query }) {
  const router = useRouter();
  const { companyId } = query;

  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [visibilityImage, setVisibilityImage] = useState(open);
  const [visibilityFile, setVisibilityFile] = useState(open);

  const PopFuncVisibilityFile = () => {
    PopUpOpen()(userDispatch);
    setVisibilityFile(open);

    // e(open);
  };
  const popupCloseHandler = (e) => {
    PopUpClose()(userDispatch);
    setVisibility(e);
  };
  const popupCloseHandlerFile = (e) => {
    PopUpClose()(userDispatch);
    setVisibilityFile(e);
  };
  const {
    authState: { user, loading },
    userDispatch,
    userState: {
      popUpOverLay: { open },
    },
    driverDispatch,
    driverState: {
      createDriver: { loading: driverLoading, error },
    },
  } = useContext(GlobalContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm();
  function onSubmit(formdata) {
    SendDriverLink(formdata);
    // console.log(`formdata`, formdata);
  }
  // GET request function to your Mock API

  const SendDriverLink = (data) => {
    data.CompanyId = user.CompanyId;

    console.log(`form`, data);
    sendDriverRegistrationLink(data)(driverDispatch)((res) => {
      if (res) {
        toast.success(`Sent Link to Driver-${data.DriverName} successfully`);

        setTimeout(() => {
          toast.dismiss();
          popupCloseHandler();
          router.push(`/driver/?companyId=${user.CompanyId}`);
        }, 5000);
      }
    })((error) => {
      toast.error(error.message);
    });
  };

  const fetchData = async () => {
    try {
      const lnk = companyId
        ? `${API_URL}driver/findAllDriversByCompany/${companyId}`
        : `${API_URL}driver/findAll`;

      const res = await axios.get(lnk);

      if (res) {
        setData(res.data.data);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // Calling the function on component mount
  useEffect(() => {
    fetchData();
    //  console.log(`data`, data);
  }, []);

  return (
    <>
      <MainLayout>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header alert alert-info">
              <h4>View List of Drivers</h4>
              <hr />
              <ul>
                <li>Edit and delete Drivers</li>
                <li>Assign Drivers to Vehicle</li>
                <li>Request for Proposal</li>

                <li>Assign Jobs to Personnel</li>
              </ul>
              <h1 className="my-5">
                <a href="#" onClick={PopFuncVisibilityFile}>
                  <i
                    className="first fas fa-user"
                    title="Send Driver Registration Link"
                  ></i>
                </a>
              </h1>
              {visibilityFile && (
                <CustomPopup
                  onClose={popupCloseHandler}
                  show={open}
                  width={"400px"}
                  height={"400px"}
                >
                  <div className="col-md-12 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className=" form-group row alert alert-info">
                        <h6>Driver Information Form</h6>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <input
                            name="Email"
                            className="form-control"
                            placeholder="Email"
                            {...register("Email", {
                              required: true,
                            })}
                            required
                          />
                        </div>

                        <div className="col-sm-12">
                          <input
                            name="DriverName"
                            className="form-control"
                            placeholder="Driver Name"
                            {...register("DriverName", {
                              required: true,
                            })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-sm-10 "></div>
                        <div className="right" style={{ float: "right" }}>
                          <CustomButton
                            loading={driverLoading}
                            isAddMode={null}
                            caption={"Send Driver Registration Link"}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </CustomPopup>
              )}
              &nbsp; &nbsp;
              {user.roles !== "driver" && (
                <h1 className="my-5">
                  <NextLink href="/driver/driver-action/" passHref>
                    <a className="mt-0 btn text-white float-right btn  btn-primary">
                      Create Driver Info
                    </a>
                  </NextLink>
                </h1>
              )}
            </div>
            <div className="card-body table-border-style">
              <Datatable loading={loading} col={columns(user)} data={data} />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
// Login.layout = "main";
//export default ListDriver;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(ListDriver), { ssr: false });
