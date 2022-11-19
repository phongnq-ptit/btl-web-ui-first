import React from "react";
import "../App.css";
import { errorNotify } from "../Notification";
import { Box } from "@mui/material";
import { Img } from "../interface";

interface Props {
  fileUpload: File | null;
  setFileUpload: Function;
  imageBook?: Img | null;
  setImageBook?: Function;
  notShowDelete?: boolean;
}

const UploadImage = ({ props }: { props: Props }) => {
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

    props.setFileUpload(file);
    event.target.value = "";
  };

  const handleDestroy = () => {
    props.setFileUpload(null);
    props.setImageBook && props.setImageBook(null);
  };

  const styleUpload = {
    display: props.fileUpload || props.imageBook ? "block" : "none",
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div className="upload">
        <input type="file" id="file_up" name="file" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
          <img
            src={
              props.imageBook
                ? props.imageBook.url
                : URL.createObjectURL(
                    props.fileUpload ? props.fileUpload : new Blob()
                  )
            }
            alt=""
          />
          {props.notShowDelete ? null : <div onClick={handleDestroy}>X</div>}
        </div>
      </div>
    </Box>
  );
};

export default UploadImage;
