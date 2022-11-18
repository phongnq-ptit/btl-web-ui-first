import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../BookContext";
import UploadImage from "../components/UploadImage";
import useBookApi from "../hooks/useBookApi";
import useCategoryApi from "../hooks/useCategoryApi";
import useImageApi from "../hooks/useImageApi";
import { Category, Img } from "../interface";
import { errorNotify, successNotify } from "../Notification";

const EditBook = () => {
  const { isReload, setIsReload } = useContext(BookContext);

  const [categories, setCategories] = useState<Array<Category>>([]);
  const [category, setCategory] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<Img | null>(null);

  const { getAllCategory } = useCategoryApi();
  const { destroyBookZero, updateBookId } = useImageApi();
  const { addBook } = useBookApi();

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    // lay ra danh sach the loai
    getAllCategory()
      .then((response) => {
        setCategories(response.data);
        setCategory(response.data[0].id + "");
      })
      .catch((err) => {});

    // xoa cac anh co bookId 0
    destroyBookZero()
      .then((response) => {
        console.log(response.message);
      })
      .catch((err) => {});
  }, []);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const save = (data: any) => {
    if (!imageUpload) {
      errorNotify("Không có ảnh nào được tải lên!");
      return;
    }

    data.categoryId = Number(category);

    addBook({ ...data })
      .then((response) => {
        if (response.data === null) {
          errorNotify(response.message);
        } else {
          updateBookId(response.data.id, imageUpload.id)
            .then((response) => {})
            .catch((err) => {});

          successNotify(response.message);
        }
      })
      .catch((err) => errorNotify(err.message))
      .finally(() => {
        setIsReload(!isReload);
        navigate("/");
      });
  };

  return (
    <Box sx={{ width: "85%", margin: "0 auto", pt: 12 }}>
      <Box component="form" noValidate onSubmit={handleSubmit(save)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="title"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Tiêu đề"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="author"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Tác giả"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Mô tả"
                      multiline
                      rows={10}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="date"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Ngày xuất bản"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                    pattern: {
                      value:
                        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
                      message:
                        "Định dạng thời gian không chính xác (format: dd/mm/yyyy).",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="page"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      type="number"
                      margin="normal"
                      label="Số trang"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Thể loại
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Thể loại"
                    value={category}
                    onChange={handleChangeSelect}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.id + ""} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <UploadImage
              props={{
                imageUpload: imageUpload,
                setImageUpload: setImageUpload,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: "24px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button type="submit" variant="contained" color="info">
              Thêm sách mới
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditBook;
