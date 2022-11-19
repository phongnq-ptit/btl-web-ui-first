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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import useBookApi from "../hooks/useBookApi";
import useCategoryApi from "../hooks/useCategoryApi";
import { Book, Category, Img } from "../interface";
import { errorNotify } from "../Notification";

const ViewBook = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [category, setCategory] = useState<string>("");
  const [bookInfo, setBookInfo] = useState<Book>();
  const [imageBook, setImageBook] = useState<Img | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const { getAllCategory } = useCategoryApi();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      date: "",
      page: 0,
    },
  });
  const params = useParams();

  const { getBook } = useBookApi();

  const getBookInfo = (id: number) => {
    getBook(id)
      .then((response) => {
        if (response.data != null) {
          const _book = response.data;
          setBookInfo(_book);
          setImageBook(_book?.image!);
          setCategory(_book?.category.id + "");
          reset({
            title: _book?.title,
            author: _book?.author,
            description: _book?.description,
            date: _book?.date,
            page: _book?.page,
          });
        } else {
          window.location.href = window.location.pathname + "/page-not-found";
        }
      })
      .catch((err) => errorNotify(err.message));
  };

  useEffect(() => {
    if (params.id) {
      getBookInfo(Number(params.id));
    }
    // eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    getAllCategory()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {});
    // eslint-disable-next-line
  }, []);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const save = (data: any) => {
    // nothing
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
                  defaultValue={bookInfo?.title}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      disabled
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
                  defaultValue={bookInfo?.author}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      disabled
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
                  defaultValue={bookInfo?.description}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      disabled
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
                  defaultValue={bookInfo?.date}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      disabled
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
                  defaultValue={bookInfo?.page}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      disabled
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
                    disabled
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category + ""}
                    label="Thể loại"
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
                fileUpload: fileUpload,
                setFileUpload: setFileUpload,
                imageBook: imageBook,
                setImageBook: setImageBook,
                notShowDelete: true,
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
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/edit/${bookInfo?.id}`}
            >
              <Button sx={{ mr: 1 }} variant="contained">
                Sửa
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewBook;
