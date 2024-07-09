import { Form, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import { loginUser, registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (isLogin) {
        response = await loginUser(values);
      } else {
        response = await registerUser(values);
      }
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        if (isLogin) {
          localStorage.setItem("token", response.data);
          window.location.href = "/";
        } else {
          message.success("Registration successful, please login.");
          setIsLogin(true);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="wrapper flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setIsLogin(!isLogin)}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className={`flip-card__front ${!isLogin ? "hidden" : ""}`}>
              <div className="title">Log in</div>
              <Form
                className="flip-card__form"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item name="email" label="Email">
                  <input className="flip-card__input" type="email" />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <input className="flip-card__input" type="password" />
                </Form.Item>
                <button className="flip-card__btn" type="submit">
                  Let's go!
                </button>
              </Form>
            </div>
            <div className={`flip-card__back ${isLogin ? "hidden" : ""}`}>
              <div className="title">Sign up</div>
              <Form
                className="flip-card__form"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item name="name" label="Name">
                  <input className="flip-card__input" type="text" />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <input className="flip-card__input" type="email" />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <input className="flip-card__input" type="password" />
                </Form.Item>
                <button className="flip-card__btn" type="submit">
                  Confirm!
                </button>
              </Form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Login;
