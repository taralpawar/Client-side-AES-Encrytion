import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Modal } from "antd";
import { Form, Input } from "antd";
import AesCtr from "./aes-ctr.js";

var decrypt = false;
const UserData = ({ match }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [decEmail, setdecEmail] = useState("");
  const [key, setKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [origemial, setOrigemal] = useState("");
  const [origpass, setOrigpass] = useState("");

  // get encrypted data from django database
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/encrypt/getdata/${match.params.username}/`)
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
      });
  }, []);

  const formVisible = (e) => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const changeKey = (e) => {
    setKey(e.target.value);
  };

  const modalSubmit = (e) => {
    console.log(key);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(key);
    const originalEmail = AesCtr.decrypt(email, key, 256);
    const originalPass = AesCtr.decrypt(password, key, 256);

    setOrigemal(originalEmail);
    setOrigpass(originalPass);

    decrypt = true;
  };
  return (
    <div>
      {/* display encrypted data */}
      <Card
        title="Encrypted Data"
        bordered={true}
        style={{ width: 600, margin: 50 }}
        extra={
          <Button type="primary" onClick={formVisible}>
            Decrypt
          </Button>
        }
      >
        <p>Username : {username}</p>
        <p>Email : {email}</p>
        <p>Password : {password}</p>
      </Card>

      {/* get the ecryption key */}
      {visible && (
        <div style={{ width: "500px", margin: "100px" }}>
          <Form onSubmitCapture={submitForm}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              onChange={changeKey}
              value={key}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Decrypt
              </Button>
            </Form.Item>
          </Form>

          {/* show decrypted data */}
          {decrypt && (
            <div>
              <Card
                title="Decrypted Data"
                bordered={true}
                style={{ width: 600, margin: 50 }}
              >
                <p>Username : {username}</p>
                <p>Email : {origemial}</p>
                <p>Password : {origpass}</p>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserData;
