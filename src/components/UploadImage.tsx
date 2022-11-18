import React, { useState } from "react";
import { Img } from "../interface";
import "../App.css";
import useImageApi from "../hooks/useImageApi";
import { errorNotify, successNotify } from "../Notification";
import { Box, LinearProgress } from "@mui/material";

interface Props {
  imageUpload: Img | null;
  setImageUpload: Function;
  bookId?: number;
}

const UploadImage = ({ props }: { props: Props }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { upload, destroy } = useImageApi();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLInputElement;

    let file = target.files ? target.files[0] : null;

    if (file === null) {
      errorNotify("Tệp không tồn tại!!");
      return;
    }

    if (file.size > 1024 * 1024) {
      errorNotify("Tệp lớn hơn 1MB!!");
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      errorNotify("Tệp không đúng định dạng JPG/PNG !!");
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
    event.target.value = "";

    setLoading(true);
    upload(formData, props.bookId ? props.bookId : 0)
      .then((response) => {
        if (response.data !== null) {
          props.setImageUpload(response.data);
          successNotify(response.message);
        } else {
          errorNotify(response.message);
        }
      })
      .catch((err) => errorNotify(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDestroy = () => {
    setLoading(true);
    destroy(props.imageUpload?.publicId!)
      .then((response) => {
        successNotify(response.message);
      })
      .catch((err) => errorNotify(err.message))
      .finally(() => {
        props.setImageUpload(null);
        setLoading(false);
      });
  };

  const styleUpload = {
    display: props.imageUpload?.url ? "block" : "none",
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div className="upload">
        <input type="file" id="file_up" name="file" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
          <img src={props.imageUpload?.url} alt="" />
          <div onClick={handleDestroy}>X</div>
        </div>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default UploadImage;
