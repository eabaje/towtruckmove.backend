import React, { useState, useCallback, useEffect, useContext } from "react";
import { getFiles, UpdateDriverFile } from "../../helpers/uploadImage";
import { GlobalContext } from "../../context/Provider";
import { LOAD_TYPE, LOAD_CAPACITY, LOAD_UNIT } from "../../constants/enum";
import {
  createDriver,
  editDriver,
  UploadDriverFile,
} from "../../context/actions/driver/driver.action";
import { IMG_URL } from "../../constants";
import UploadWidget from "./upload-widget";

export default function UpdateFileUpload(props) {
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
    driverDispatch,
    driverState: {
      createDriver: { error, loading },
    },
  } = useContext(GlobalContext);

  const measureRef = React.useRef();

  // const selectFile = async (e) => {
  //   setCurrentFile(e.target.files[0]);
  //   if (props.fileType === "image") {
  //     setPreviewImage(URL.createObjectURL(e.target.files[0]));
  //   }
  //   setProgress(0);
  //   setMessage("");
  // };

  function upload() {
    setProgress(0);
    UploadDriverFile(
      currentFile,
      props.refId,
      props.fileType,
      props.companyId,
      props.email,
      (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }
    )(driverDispatch)((res) => {
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
      <UploadWidget
        title={props.title}
        refId={props.refId}
        upload={upload}
        popupCloseHandlerImage={popupCloseHandlerImage}
      />
    </>
  );
}
