import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { errorNotify, successNotify } from "../../Notification";
import useAuthApi from "../../hooks/useAuthApi";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { register } = useAuthApi();

  const handleRegister = (data: any) => {
    register({ ...data })
      .then((response) => {
        if (response.data === null) {
          errorNotify(response.message);
          setErr(response.message);
        } else {
          setLoading(true);
          successNotify(response.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        setErr(err.message);
        errorNotify(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validatePassword = (value: string): string => {
    if (value) {
      const checkPasswordFormat: boolean =
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/.test(value);

      if (checkPasswordFormat) {
        return "Mật khẩu cần dài tối thiểu 6 ký tự, phải có 1 chữ thường, 1 chữ hoa, 1 số!";
      }
    }
    return "";
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
          sx={{ mt: 3 }}
        >
          {err && <Alert severity="error">{err}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    margin="normal"
                    label="Name"
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
                name="email"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    margin="normal"
                    label="Email"
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
                    // prettier-ignore
                    value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                    message: "Email không đúng định dạng!",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    margin="normal"
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrPassword(validatePassword(event.target.value));
                    }}
                    error={password === "" ? !!error : !!errPassword}
                    helperText={password === "" ? error?.message : errPassword}
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
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    margin="normal"
                    type="password"
                    label="Confirm Password"
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
                  validate: {
                    equals: (value) =>
                      value === password ||
                      "Xác nhận mật khẩu không trùng nhau.",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "darkblue" }}
              >
                Bạn dã có tài khoản? Đăng nhập ngay.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
