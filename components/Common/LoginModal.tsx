import { useQrImage } from "context/QrImageProvider";
import { Modal } from "antd";
import {
  useDispatchModalVisible,
  useModalVisible,
} from "context/LoginModalVisibleProvider";
import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

function LoginModal() {
  const visible = useModalVisible();
  const setVisible = useDispatchModalVisible();
  const { qrImg, status } = useQrImage();
  return (
    <Modal
      width={530}
      open={visible}
      title={"登录"}
      centered
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
        {status !== 802 ? (
          <>
            <div className={styles["login-modal-image"]} />
            <div className={styles["qr-code-area"]}>
              <div style={{ fontSize: "18px", fontWeight: 500 }}>扫码登录</div>
              <Image width={160} height={160} src={qrImg} alt={qrImg} />
              <div style={{ fontSize: "10px", color: "rgba(0, 0, 0, 0.4)" }}>
                使用
                <span style={{ color: "#0c73c2", margin: "0px 6px" }}>
                  网易云音乐APP
                </span>
                扫码登录
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Image
              src={
                "https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9765284460/1b1d/9f46/2fa3/2d5d07bb5fcf8c24c1ad788c923ef313.png"
              }
              alt={"success"}
              width={140}
              height={140}
            />
            <h3>扫描成功</h3>
            <div>请在手机上确认登录</div>
          </div>
        )}
      </div>
      <div className={styles["login-modal-footer"]}>
        <div className={styles["other-way-login"]}>选择其他登录方式</div>
      </div>
    </Modal>
  );
}

export default LoginModal;
