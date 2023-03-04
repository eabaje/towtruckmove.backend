import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  updateDocuments,
  updateMedia,
  uploadDocuments,
  uploadMedia,
} from "../../helpers/uploadImage";

export default function UploadFileWidget(props) {
  const {
    refId,
    popupCloseHandlerImage,
    upload,
    uploadType,
    mediaId,
    title,
    isAdd,
  } = props;
  const [width, setWidth] = useState(-1);
  const [currentFileWidget, setCurrentFileWidget] = useState("");
  const [previewImageWidget, setPreviewImageWidget] = useState("");
  const [progressWidget, setProgressWidget] = useState(0);
  const [messageWidget, setMessageWidget] = useState("");

  const _selectFileWidget = async (event) => {
    setCurrentFileWidget(event.target.files[0]);
    if (props.fileType === "image") {
      setPreviewImageWidget(URL.createObjectURL(event.target.files[0]));
    }
    setProgressWidget(0);
    setMessageWidget("");
  };

  function uploadFile(isAdd = true) {
    setProgressWidget(0);
    isAdd
      ? uploadDocuments(
          uploadType,
          currentFileWidget,
          mediaId,
          refId,
          (event) => {
            setMessageWidget(Math.round((100 * event.loaded) / event.total));
          }
        )
          .then((response) => {
            setMessageWidget(response.data.message);

            //  return getFiles(props.refId);
          })
          .then((files) => {
            setMessageWidget("File Uploaded!");
            // setImageInfos(files.data.data);
            // return getFiles(refId);

            //  console.log("imageInfos", this.state.imageInfos);
          })
          .catch((err) => {
            setProgressWidget(0);
            setMessageWidget("Could not upload the image!");
            setCurrentFileWidget(undefined);
            console.log("err", err);
          })
      : updateDocuments(
          uploadType,
          currentFileWidget,
          mediaId,
          refId,
          (event) => {
            setMessageWidget(Math.round((100 * event.loaded) / event.total));
          }
        )
          .then((response) => {
            setMessageWidget(response.data.message);

            //  return getFiles(props.refId);
          })
          .then((files) => {
            setMessageWidget("File Uploaded!");
            // setImageInfos(files.data.data);
            // return getFiles(refId);

            //  console.log("imageInfos", this.state.imageInfos);
          })
          .catch((err) => {
            setProgressWidget(0);
            setMessageWidget("Could not upload the File!");
            setCurrentFileWidget(undefined);
            console.log("err", err);
          });
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-8">
            <h5>{props.title ? props.title : `Upload File`}</h5>
            <hr />
            <input
              type="file"
              name="file-6[]"
              id="file-6"
              className="inputfile inputfile-4"
              onChange={_selectFileWidget}
            />
            <label htmlFor="file-6">
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
                disabled={!currentFileWidget}
                onClick={uploadFile}
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {currentFileWidget && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progressWidget}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progressWidget + "%" }}
            >
              {progressWidget}%
            </div>
          </div>
        )}

        {messageWidget && (
          <div className="alert alert-secondary mt-3" role="alert">
            {messageWidget}
          </div>
        )}
      </div>
      ;
    </>
  );
}
