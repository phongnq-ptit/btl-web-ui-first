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
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { errorNotify, successNotify } from "../../Notification";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: any) => {
    await axios
      .post("http://localhost:8080/api/users/login", { ...data })
      .then((response) => {
        if (response.data.data !== null) {
          localStorage.setItem("login", JSON.stringify(response.data.data));
          successNotify(response.data.message);
          setErr("");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/";
          }, 3000);
        } else {
          errorNotify(response.data.message);
          setErr(response.data.message);
        }
      })
      .catch((e) => {
        setErr(e.message);
        errorNotify(e.message);
      });
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
          Đăng Nhập
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          sx={{ mt: 1 }}
        >
          {err && <Alert severity="error">{err}</Alert>}
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                margin="normal"
                type="password"
                label="Password"
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
                value: /^[A-Za-z0-9]{6,}$/,
                message: "Độ dài mật khẩu cần lớn hơn hoặc bằng 6!",
              },
            }}
          />
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
            Đăng Nhập
          </Button>
          <Grid container>
            <Grid item>
              <Link
                style={{ color: "darkblue", textDecoration: "none" }}
                to="/register"
              >
                {"Bạn không có tài khoản? Đăng ký ngay."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
