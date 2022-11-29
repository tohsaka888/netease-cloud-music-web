import React from "react";
import { ErrorProps } from "next/error";
import { Result, Button } from "antd";
import { useRouter } from "next/router";
import { ResultStatusType } from "antd/es/result";
import { NextPage } from "next";

const Error: NextPage<ErrorProps & { errMsg?: string }> = ({
  statusCode,
  title = "Not Found",
  errMsg = "┭┮﹏┭┮人家坏了啦!",
}) => {
  const { push } = useRouter();
  return (
    <Result
      style={{
        marginTop: "16px",
      }}
      status={statusCode as ResultStatusType}
      title={statusCode + ' ' + title}
      subTitle={errMsg}
      extra={
        <Button
          type="primary"
          onClick={() => {
            push("/");
          }}
        >
          回到主页
        </Button>
      }
    />
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode: statusCode || 404,
    title: err?.name,
    errMsg: err?.message,
  };
};

export default Error;
