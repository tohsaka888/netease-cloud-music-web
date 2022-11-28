import { Button, Result } from "antd";
import { useRouter } from "next/router";
import React from "react";

function ErrorPage() {
  const router = useRouter();
  console.log(router);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">回到主页</Button>}
    />
  );
}

export default ErrorPage;
