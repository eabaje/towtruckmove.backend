import React, { useState, useCallback, useEffect, Component } from "react";
import {
  getDriverImg,
  getFiles,
  getImg,
  uploadMedia,
} from "../../helpers/uploadImage";
import { IMG_URL, PIC_URL } from "../../constants";

export default function ImageUpload(props) {
  const { refId, onChangePicHandler, url, fieldName, reload } = props;
  const [width, setWidth] = useState(-1);
  const [currentFile, setCurrentFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfo, setImageInfo] = useState({});
  const [imageGallery, setImageGallery] = useState([
    {
      src: null,
    },
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const _selectFile = async (e) => {
    setPreviewImage("");
    setImageInfo(null);
    setCurrentFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  useEffect(() => {
    //  alert(props.refId);
    if (refId !== undefined) {
      getImg(url, refId).then((files) => {
        const photos = files.data.data;

        //  alert(newMarkers);
        setImageInfo(files.data.data);

        //  alert(imageGallery);
        console.log("imageInfos", imageInfo);
      });
    }
  }, [reload]);

  return (
    <>
      <div className="previewComponent" style={{ float: "right" }}>
        {previewImage ? (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        ) : (
          <div>
            {Object.keys(imageInfo).length === 0 ? (
              <div className="preview">Please select an Image for Preview</div>
            ) : (
              <img
                className="preview"
                src={PIC_URL + imageInfo[fieldName]}
                alt=""
              />
            )}
          </div>
        )}

        {/* <div className="imgPreview">{$imagePreview}</div> */}
        <input
          className="form-control-file"
          type="file"
          id="filePicUrl"
          name="filePicUrl"
          style={{
            visibility: props.show ? "visible" : "hidden",
          }}
          onChange={(e) => {
            _selectFile(e);
            onChangePicHandler(e);
          }}
        />
      </div>
    </>
  );
}
