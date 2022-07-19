import { useRouter } from "next/router";
import React, { useContext } from "react";

import FormCustom from "../../components/shared/FormCustom";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const router = useRouter();
  const { loggedIn } = useContext(AuthContext);
  if (loggedIn) {
    router.push("/");
    return null;
  }
  return <FormCustom type="login" />;
};

export default Login;
