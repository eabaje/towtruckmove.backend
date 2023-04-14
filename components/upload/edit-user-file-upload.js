import React, { useState, useCallback, useEffect, useContext } from "react";
import { getFiles, UpdateDriverFile } from "../../helpers/uploadImage";
import { GlobalContext } from "../../context/Provider";

import { IMG_URL } from "../../constants";
import { UploadUserFile } from "../../context/actions/user/user.action";

export default function UpdateUserFileUpload(props){
  const { refId, popupCloseHandlerImage } = props;
  const [width, setWidth] = useState(-1);
  const [currentFile, setCurrentFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);
  const [imageGallery, setImageGallery] = useState([
    {
      src: null,
    },
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const {
    userDispatch,
    userState: {
      createUser: { error, loading },
    },
  } = useContext(GlobalContext);

  const measureRef = React.useRef();

  const selectFile = async (e) => {
    setCurrentFile(e.target.files[0]);
    if (props.fileType === "image") {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    setProgress(0);
    setMessage("");
  };

  function upload() {
    setProgress(0);
    UploadUserFile(
      currentFile,
      props.refId,
      props.fileType,
      props.companyId,
      props.email,
      (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }
    )(userDispatch)((res) => {
      setProgress(0);
      setMessage(res.data.message);
    })((err) => {
      setProgress(0);
      setMessage(`Could not upload the ${props.fileType}!`);
      setCurrentFile(undefined);
    });

    //   UpdateDriverFile(
    //     currentFile,
    //     props.refId,
    //     props.fileType,
    //     props.companyId,
    //     props.email,
    //     (event) => {
    //       setProgress(Math.round((100 * event.loaded) / event.total));
    //     }
    //   )
    //     .then((response) => {

    //       setProgress(0);
    //       setMessage(response.data.message);

    //       //  return getFiles(props.refId);
    //     })
    //     // .then((files) => {
    //     //   setImageInfos(files.data.data);
    //     //   return getFiles(props.refId);

    //     //   //  console.log("imageInfos", this.state.imageInfos);
    //     // })
    //     .catch((err) => {
    //       setProgress(0);
    //       setMessage("Could not upload the image!");
    //       setCurrentFile(undefined);
    //     });
  }
  // {({ measureRef }) => {
  //   if (width < 1) {
  //     return <div ref={measureRef} />;
  //   }
  //   let columns = 1;
  //   if (width >= 480) {
  //     columns = 2;
  //   }
  //   if (width >= 1024) {
  //     columns = 3;
  //   }
  //   if (width >= 1824) {
  //     columns = 4;
  //   }
  // }

  return (
    <>
      {/* <Measure
        bounds
        onResize={(contentRect) =>
          setWidth({ width: contentRect.bounds.width })
        }
      >
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          let columns = 1;
          if (width >= 480) {
            columns = 2;
          }
          if (width >= 1024) {
            columns = 3;
          }
          if (width >= 1824) {
            columns = 4;
          } */}
      <div>
        <div className="row">
          <div className="col-8">
            <h5>{props.title ? props.title : `Upload pictures or images`}</h5>
            <hr />
            <input
              type="file"
              name="file-5[]"
              id="file-5"
              className="inputfile inputfile-4"
              onChange={selectFile}
            />
            <label htmlFor="file-5">
              <figure>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                >
                  <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                </svg>
              </figure>
              {/* <span>
              {this.state.uploading
                ? this.state.loaded + "%"
                : this.state.message}
            </span> */}
            </label>
            <br />
            <div style={{ "padding-left": "40px" }}>
              <button
                type="button"
                className="btn btn-success btn-sm "
                disabled={!currentFile}
                onClick={upload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        )}

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
      ;
      {/* }}
      </Measure> */}
    </>
  );
}
