import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import AesCtr from "./aes-ctr.js";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";

const CustomForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    // encrypt data
    const pass = password;
    const plainemail = email;
    const plainpass = password;
    const cipherEmail = AesCtr.encrypt(plainemail, pass, 256);
    const cipherPassword = AesCtr.encrypt(plainpass, pass, 256);
    const body = {
      username: username,
      email: cipherEmail,
      password: cipherPassword,
    };

    //post data to django
    console.log(body);
    axios.post(`http://127.0.0.1:8000/encrypt/savedata/`, body).then((res) => {
      console.log(res.data);
    });

    //redirect to show data

    let path = `/showdata/${username}/`;
    history.push(path);
  };

  return (
    <div style={{ width: "500px", margin: "100px" }}>
      <Form name="basic" onSubmitCapture={submitForm}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input the username!" }]}
          onChange={changeUsername}
          value={username}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input the email!" }]}
          onChange={changeEmail}
          value={email}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          onChange={changePassword}
          value={password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Encrypt
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(CustomForm);
