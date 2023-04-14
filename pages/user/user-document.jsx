import React, { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  listCompanyDoc,
  listUserSubscriptions,
} from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/usersubscription";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
import { DOC_TYPE } from "../../constants/enum";
import AddEditDocument from "../../components/form/user/AddEditDocument";
import { API_URL, DOC_URL, PIC_URL } from "../../constants";
// import DocumentUpload from "../../components/upload/doc-file-upload";

// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserDocument({ query }) {
  // const router = useRouter()
  //*********Global Ref *****************
  const { companyId, userId } = query;

  const editRef = React.useRef();
  const delRef = React.useRef();

  //*************STATE VARIABLES ************* */

  //********************CONTEXT FUNCTIONS ***************** */
  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      Companys: { data, loading },
    },
  } = useContext(GlobalContext);

  // *****************************USE EFFECT *****************

  useEffect(() => {
    if (data.length === 0) {
      listCompanyDoc(companyId)(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
    console.log(`companyDoc`, data);
  }, []);

  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            <h3>My Documents</h3>
            <hr />
          </div>
          <div className="card-body table-border-style">
            <p class="lead">
              A Document Packet ("Docpack") is a compilation of your{" "}
              <strong>Certificate of InCoporation</strong>,{" "}
              <strong>Insurance and/or Bond Certificate</strong>,{" "}
              <strong>A Completed W-9 Form</strong>, and Other Licenses (if
              any).Kindly upload a scanned copy, we securely store them and
              allow you to give either temporary or permanent viewing access at
              your discretion.
            </p>

            <hr />

            <p>
              Once we are satisfied with you documents as stated ,you will be
              notified by email .
            </p>

            <br />
            {data?.data?.length > 0 ? (
              <>
                {" "}
                <button className="mt-0 btn text-white float-right btn  btn-primary">
                  Add More Company Document Shipment
                </button>
                <div className="card-header">List of Files</div>
                <ul className="list-group list-group-flush">
                  {data?.data.map((doc, index) => (
                    <li className="list-group-item" key={index}>
                      {
                        DOC_TYPE.find((item) => item.value === doc?.DocType)
                          ?.text
                      }{" "}
                      &nbsp; &nbsp; -{doc.DocTitle} &nbsp; &nbsp;{" "}
                      <a href={PIC_URL + doc.DocUrl}>{doc.DocName}</a>
                      &nbsp;{" "}
                      <i
                        className="fa fa-pen"
                        style={{ cursor: "hand" }}
                        title="Edit Document"
                        ref={editRef}
                        id={doc.DocId}
                        onClick={() => {
                          setVisibilityImage(!visibilityImage);
                          setMediaId(img.MediaId);
                        }}
                      ></i>
                      &nbsp;|&nbsp;
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        title="Delete Document"
                        ref={delRef}
                        id={doc.DocId}
                        onClick={(e) => deleteImg(e)}
                      ></i>
                    </li>
                  ))}
                </ul>
              </>
            ) : data?.data?.length > 0 && docId ? (
              <AddEditDocument query={query} />
            ) : (
              <AddEditDocument query={query} />
            )}
          </div>

          {/* <DocumentUpload
            refId={companyId}
            title={"Upload Document Files"}
            fileType="file"
            uploadType={"vehicle"}
          /> */}
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default UserSubscription;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(UserDocument), { ssr: false });
