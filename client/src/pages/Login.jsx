import { Link } from "react-router-dom";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUserLogin = async (values) => {
    try {
      setLoading(true);
      const response = await loginUser(values);
      if (response.success) {
        message.success("Login successful");
        navigate("/"); //this is temporart
      } else {
        message.error(response.message || "Invalid Credentials");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };
  const handleFinish = (values) => {
    console.log("User Logged In!", values);
  };
  return (
    <div>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1 style={{ color: "black" }}>Login to BMS</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={handleUserLogin}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your Email"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
};

export default Login;
