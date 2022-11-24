import { Modal } from "antd";
import {
  useDispatchModalVisible,
  useModalVisible,
} from "context/LoginModalVisibleProvider";
import React from "react";

function LoginModal() {
  const visible = useModalVisible();
  const setVisible = useDispatchModalVisible();
  return (
    <Modal
      open={visible}
      title={"登录"}
      onOk={() => {
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}
    ></Modal>
  );
}

export default LoginModal;
