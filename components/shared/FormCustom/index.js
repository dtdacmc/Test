import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import Cookies from "js-cookie";

import styles from "./index.module.scss";
import { login, register } from "../../../apis";
import { useRouter } from "next/router";

const FormCustom = ({ type = "login" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      await login({ email: values.email, password: values.password }).then(
        (response) => {
          switch (response.status) {
            case 200:
              const expires = new Date(60 * 30 * 1000);
              Cookies.set("token", response.data.token, expires);
              router.push("/");
              break;
            case 400:
              message.error(response.data.error);
              break;
            default:
              message.error("An error occurred. Please try again!");
              break;
          }
        }
      );
    } catch (error) {}
    setIsLoading(false);
  };

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      await register({ email: values.email, password: values.password }).then(
        (response) => {
          message.success(response.data.message);
          router.push("/login");
          switch (response.status) {
            case 200:
              message.success(response.data.message);
              router.push("/login");
              break;
            case 422:
              message.error(response.data.email[0]);
              break;
            default:
              message.error("An error occurred. Please try again!");
              break;
          }
        }
      );
    } catch (error) {}
    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        name="basic"
        onFinish={type === "login" ? handleLogin : handleRegister}
        autoComplete="off"
        className={styles.container}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item className={styles.buttonSubmit}>
          <Button type="primary" htmlType="submit">
            {type === "login" ? "Login" : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default FormCustom;
