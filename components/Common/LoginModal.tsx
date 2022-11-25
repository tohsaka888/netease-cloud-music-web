import { Modal } from "antd";
import {
  useDispatchModalVisible,
  useModalVisible,
} from "context/LoginModalVisibleProvider";
import React from "react";
import styles from "./index.module.css";

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
      className={"login-modal"}
      footer={null}
    >
      <div className={styles["login-modal-body"]}>
        
      </div>
    </Modal>
  );
}

export default LoginModal;
