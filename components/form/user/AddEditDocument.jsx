import React, { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  listCompanyDocById,
  updateCompanyDoc,
  uploadCompanyDoc,
} from "../../../context/actions/user/user.action";
import { GlobalContext } from "../../../context/Provider";

import { toast } from "react-toastify";

import dynamic from "next/dynamic";
import { DOC_TYPE } from "../../../constants/enum";
import { useRouter } from "next/router";

const AddEditDocument = ({ query }) => {
  const { companyId, userId, docId } = query;
  const router = useRouter();

  //*************STATE VARIABLES ************* */

  const [rowsData, setRowsData] = useState([]);
  const [docFile, setdocFile] = useState([]);

  //********************CONTEXT FUNCTIONS ***************** */
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      Company: { data, loading },
    },
  } = useContext(GlobalContext);

  //**************** PAGE Functions ***************** */

  const addTableRows = () => {
    const rowsInput = {
      DocName: "",
      DocTitle: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const onChangeDocHandler = async (e) => {
    setdocFile((docFile) => [...docFile, e.target.files[0]]);
    // setdocFile((docFile) => e.target.files[0]);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  function redirectPage() {
    setTimeout(() => {
      toast.dismiss();
      user.roles === "carrier"
        ? router.reload(`/shipment/?companyId=${user.CompanyId}`)
        : user.roles === "shipper"
        ? router.reload(`/shipment/?userId=${user.UserId}`)
        : router.reload(`/shipment/?companyId=${user.CompanyId}`);
    }, 5000);
  }

  // *****************************USE EFFECT *****************
  useEffect(() => {
    addTableRows();

    if (docId) {
      listCompanyDocById(docId)(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }

    // console.log(`loading`, loading);
  }, []);

  //**************************FORM FUNCTIONS ************* */

  const {
    register: documentform,
    formState: { errors },
    handleSubmit: handleSubmit,
    setValue,
    control,
  } = useForm();

  function onSubmit(formdata) {
    console.log("formdata", formdata);
    return uploadCompanyDocAction(formdata, docFile);

    // return companyId
    //   ? uploadCompanyDocAction(shipmentId, companyId, userId)
    //   : updateCompanyDocAction(formdata, companyId);
  }

  function updateCompanyDocAction(formdata, shipmentId) {
    updateCompanyDoc(formdata, companyId)(userDispatch)((res) => {
      if (res) {
        toast.success("Contract created successfully");
      }
      setTimeout(() => {
        toast.dismiss();
        router.reload(`/user/?companyId=${user.CompanyId}`);
      }, 5000);
    })((error) => {
      toast.error(error);
    });
  }

  const uploadCompanyDocAction = (formdata, docFile) => {
    //   setLoadSpinner({ loadSigned: true });
    uploadCompanyDoc(formdata, docFile)(userDispatch)((res) => {
      if (res) {
        toast.success("Document upload successfull");
      }
      setTimeout(() => {
        toast.dismiss();
        // router.reload(`/user/?companyId=${user.CompanyId}`);
      }, 5000);
    })((error) => {
      toast.error(error);
    });
  };

  console.log(`doc`, docFile);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="input-group mb-3">
        <input
          ref={ref}
          type="text"
          className="form-control datepicker"
          value={value}
          onClick={onClick}
          placeholder="Click to enter date"
          required
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <i className="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    );
  });
  CustomInput.displayName = "CustomInput";

  return (
    <div class="mb-0">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <div className="col-md-12">
            <div className="col-md-12 alert alert-info">
              <h6>
                {" "}
                User document List
                {/* <a
                      href="javascript:void()"
                      className=" right"
                      onClick={addTableRows}
                    >
                      + Add Vehicle
                    </a> */}
                <button
                  type="button"
                  className=" btn-outline-primary right"
                  onClick={addTableRows}
                >
                  + Add Document
                </button>
              </h6>
            </div>
          </div>
          <input
            type="hidden"
            name="RefId"
            value={companyId}
            className="form-control"
            {...documentform("RefId")}
          />
          <input
            type="hidden"
            name="CompanyId"
            value={companyId}
            className="form-control"
            {...documentform("CompanyId")}
          />
        </div>
        {rowsData.map((document, index) => (
          <>
            <div id={index}>
              <div className="form-group row">
                <div className="col-sm-4">
                  <select
                    required="required"
                    className="form-control"
                    name={`document[${index}].DocType`}
                    id={`document[${index}].DocType`}
                    {...documentform(`document[${index}].DocType`)}
                  >
                    <option value="">Choose Document Type</option>
                    {DOC_TYPE.map((item) => (
                      <option
                        key={item.value}
                        selected={data.DocType === item.value}
                        value={item.value}
                      >
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <input
                    name={`document[${index}].DocTitle`}
                    className="form-control"
                    value={data.DocTitle}
                    placeholder="Document Title"
                    {...documentform(`document[${index}].DocTitle`, {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    type="file"
                    id={`document[${index}].DocName`}
                    name={`document[${index}].DocName`}
                    {...documentform(`document[${index}].DocName`)}
                    onChange={(e) => onChangeDocHandler(e)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12 alert alert-info">
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger right"
                      onClick={() => deleteTableRows(index)}
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}

        <div className="col-md-6">
          <button type="submit" className="btn  btn-primary">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditDocument;
