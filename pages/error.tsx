import { Button, Result } from "antd";
import { useRouter } from "next/router";
import React from "react";

function ErrorPage() {
  const { query, push } = useRouter();
  return (
    <Result
      style={{
        marginTop: "16px",
      }}
      status="500"
      title={[query.errName]}
      subTitle={
        <>
          <div>{query.key}</div>
          <div>{query.errMessage}</div>
        </>
      }
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
}

export default ErrorPage;
