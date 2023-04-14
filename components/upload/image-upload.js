import React, { useState, useCallback, useEffect, Component } from "react";
import { deleteMedia, getFiles, uploadMedia } from "../../helpers/uploadImage";
import Gallery from "react-grid-gallery";
import { IMG_URL, PIC_URL } from "../../constants";
import CustomPopup from "../popup/popup.component";
import UpdateFileUpload from "./edit-file-upload";
import UploadWidget from "./upload-widget";
import { toast } from "react-toastify";

export default function UploadImages(props) {
  const { refId, title, backArrow, role, SetFormStep, uploadType } = props;

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
  const [visibilityImage, setVisibilityImage] = useState(false);
  const [mediaId, setMediaId] = useState();

  const popupCloseHandlerImage = (e) => {
    setVisibilityImage(e);
  };

  const editRef = React.useRef();
  const delRef = React.useRef();

  const selectFile = async (e) => {
    setCurrentFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const deleteImg = (e) => {
    var isDelete = confirm("Sure you want to delete file?");
    if (isDelete) {
      deleteMedia(e.currentTarget.id)((files) => {
        console.log("files", files);
        // getAllFiles(refId);
      })((err) => {
        toast.error(err.message);
      });
    }
  };

  const getAllFiles = (refId) => {
    getFiles(refId, "image").then((files) => {
      const photos = files.data.data;
      let newMarkers = photos.map((el) => ({
        src: PIC_URL + el.ImgPath,
        thumbnail: PIC_URL + el.ThumbPath,
      }));
      //  alert(newMarkers);
      setImageInfos(files.data.data);
      setImageGallery(newMarkers);
      //  alert(imageGallery);
      console.log("imageInfos", imageGallery);
    });
  };

  useEffect(() => {
    // console.log("props.refId",refId );
    if (refId !== undefined) {
      getAllFiles(props.refId, "image");
    }
  }, []);

  function upload() {
    setProgress(0);

    uploadMedia(uploadType, currentFile, refId, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);

        //  return getFiles(props.refId);
      })
      .then((files) => {
        setImageInfos(files.data.data);
        return getAllFiles(props.refId, "image");

        //  console.log("imageInfos", this.state.imageInfos);
      })
      .catch((err) => {
        setProgress(0);
        setMessage("Could not upload the image!");
        setCurrentFile(undefined);
        console.log("err", err);
      });
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-12">
            <span style={{ display: "inline-block" }}>
              {" "}
              <h5>{title ? title : `Upload pictures or images`}</h5>
            </span>
            {backArrow && (
              <span style={{ display: "inline-block", float: "right" }}>
                {" "}
                <i
                  className="fa fa-arrow-left"
                  aria-hidden="true"
                  title="Go back"
                  onClick={SetFormStep}
                ></i>
              </span>
            )}

            <hr />
            {role !== "shipper" && (
              <>
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
                    className="btn btn-success btn-sm "
                    disabled={!currentFile}
                    onClick={upload}
                  >
                    Upload
                  </button>
                </div>
              </>
            )}
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

        <div className="card mt-3">
          <div style={{ height: 250, overflow: "scroll" }}>
            <Gallery
              images={imageGallery}
              enableLightbox={true}
              // maxRows={3}
              backdropClosesModal
              // currentImage={3}
              // isOpen={ true}
            />
          </div>

          {role !== "shipper" && (
            <>
              <div className="card-header">List of Files</div>
              <ul className="list-group list-group-flush">
                {imageInfos &&
                  imageInfos.map((img, index) => (
                    <li className="list-group-item" key={index}>
                      <img
                        src={PIC_URL + img.ThumbPath}
                        className="previewImg"
                      />{" "}
                      <a href={img.ImgPath}>{img.FileName}</a>&nbsp;{" "}
                      <i
                        className="fa fa-pen"
                        aria-hidden="true"
                        style={{ cursor: "hand" }}
                        title="Edit Picture"
                        ref={editRef}
                        id={img.MediaId}
                        onClick={() => {
                          setVisibilityImage(!visibilityImage);
                          setMediaId(img.MediaId);
                        }}
                      ></i>
                      &nbsp;|&nbsp;
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        title="Delete Picture"
                        ref={delRef}
                        id={img.MediaId}
                        onClick={(e) => deleteImg(e)}
                      ></i>
                    </li>
                  ))}
              </ul>

              {visibilityImage && (
                <CustomPopup
                  onClose={popupCloseHandlerImage}
                  show={visibilityImage}
                >
                  <UploadWidget
                    refId={props.refId}
                    fileType={"image"}
                    uploadType={uploadType}
                    mediaId={mediaId}
                    popupCloseHandlerImage={popupCloseHandlerImage}
                  />
                </CustomPopup>
              )}
            </>
          )}
        </div>
      </div>
      ;
      {/* }}
      </Measure> */}
    </>
  );
}
