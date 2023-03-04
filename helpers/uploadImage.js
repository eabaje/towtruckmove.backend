import axios from "./axiosInstance";

export const uploadImage = (file) => (onSuccess) => (onError) => {
  const data = new FormData();
  data.append("filePicUrl", file);
  console.log(`object`, data);
  axios
    .post("/upload/uploadImage", data, {
      // receive two parameter endpoint url ,form data
    })
    .then((res) => {
      // then print response status

      onSuccess(res.data.filename);
    })
    .catch((error) => {
      onError(error.message);
    });
};

export const uploadDocuments = (
  uploadType = "shipment",
  file,
  mediaId,
  referenceId,
  onUploadProgress
) => {
  let formData = new FormData();
  //alert(referenceId);
  formData.append("UploadType", uploadType);
  formData.append("RefId", referenceId);
  formData.append("MediaId", mediaId);
  formData.append("doc", file);

  return axios.post("/upload/uploadDocument", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    onUploadProgress,
  });
};

export const updateDocuments = (
  uploadType = "shipment",
  file,
  mediaId,
  referenceId,
  onUploadProgress
) => {
  let formData = new FormData();
  //alert(referenceId);
  formData.append("UploadType", uploadType);
  formData.append("RefId", referenceId);
  formData.append("MediaId", mediaId);
  formData.append("doc", file);

  return axios.post("/upload/uploadDocument", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    onUploadProgress,
  });
};

export const uploadMedia = (uploadUrl, file, referenceId, onUploadProgress) => {
  let formData = new FormData();

  formData.append("UploadUrl", uploadUrl);
  formData.append("RefId", referenceId);
  formData.append("file", file);

  return axios.post("/upload/uploadImageWithData", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    onUploadProgress,
  });
};

export const updateMedia = (
  fileType,
  uploadUrl,
  defaultTbl = null,
  file,
  mediaId,
  referenceId,
  onUploadProgress
) => {
  let formData = new FormData();

  formData.append("UploadUrl", uploadUrl);
  formData.append("FileType", fileType);
  formData.append("RefId", referenceId);
  formData.append("MediaId", mediaId);
  formData.append("file", file);

  return axios.post(
    defaultTbl === null ? "/upload/updateImageWithData" : defaultTbl,
    formData,
    {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      onUploadProgress,
    }
  );
};

export const deleteMedia = (mediaId) => (onSucess) => (onError) => {
  axios
    .delete(`/upload/deleteFile/${mediaId}`)
    .then((res) => {
      onSucess(res.data.message);
    })
    .catch((err) => {
      onError(err);
    });
};

export const updateDriverFile = (
  file,
  referenceId,
  fileType,
  companyId,
  email,
  onUploadProgress
) => {
  let formData = new FormData();
  //alert(referenceId);
  formData.append("DriverId", referenceId);
  formData.append("FileType", fileType);
  formData.append("CompanyId", companyId);
  formData.append("Email", email);
  formData.append("file", file);

  return axios.post("/driver/updateFile", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    onUploadProgress,
  });
};

export const getFiles = (refId, fileType) => {
  return axios.get(`/upload/getFiles/${refId}/${fileType}`);
};

export const getImg = (url, refId) => {
  return axios.get(`${url}${refId}`);
};
