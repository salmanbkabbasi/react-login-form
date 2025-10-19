import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Checkbox, Button } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleLogin = (values) => {
    if (values.username === "admin" && values.password === "Admin@123") {
      setIsLoggedIn(true);
      alert("Login successful!");
      navigate("/home");
      return true; // ✅ success
    } else {
      alert("Invalid username or password!");
      return false; // ❌ failed
    }
  };

  const validate = Yup.object({
    username: Yup.string()
      .min(5, "Must be at least 5 characters!")
      .required("Please enter your username!"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters long!")
      .matches(
        passwordRegex,
        "Password must contain uppercase, lowercase, number, and special character!"
      )
      .required("Please enter your password!"),

    remember: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{ username: "", password: "", remember: false }}
      validationSchema={validate}
      onSubmit={(values, actions) => {
        const success = handleLogin(values); // ✅ check login result

        if (success) {
          localStorage.setItem("userData", JSON.stringify(values));
          actions.resetForm({
            values: { username: "", password: "", remember: false },
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            fontFamily: "sans-serif",
          }}
        >
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            style={{
              width: "400px",
              padding: "30px",
              border: "2px solid #ddd",
              borderRadius: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Welcome!
            </h1>

            <Form.Item
              label="Username"
              validateStatus={
                touched.username && errors.username ? "error" : ""
              }
              help={touched.username && errors.username ? errors.username : ""}
            >
              <Input
                name="username"
                placeholder="Enter your username!"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={
                touched.password && errors.password ? "error" : ""
              }
              help={touched.password && errors.password ? errors.password : ""}
            >
              <Input.Password
                name="password"
                placeholder="Enter your password!"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                name="remember"
                checked={values.remember}
                onChange={(e) =>
                  setFieldValue("remember", e.target.checked)
                }
              >
                Remember me!
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  borderRadius: "6px",
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                Login
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <a href="/" style={{ color: "black", textDecoration: "none" }}>
                Forgot password?
              </a>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
