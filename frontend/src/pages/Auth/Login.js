import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useLogin } from "../../hooks/post";
import jwtDecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export function Login() {
  const [roll, setRoll] = useState();

  const navigate = useNavigate();
  const [login] = useLogin({
    variables: {
      login: {
        roll: roll,
      },
    },
  });

  const onLogin = async (email) => {
    setRoll(email);
    const loginOutput = await login();
    console.log(loginOutput);
    navigate("/complaints");
  };

  return (
    <div className="Login-Page">
      <h2>Login With your SMAIL :)</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const USER_CREDENTIALS = jwtDecode(credentialResponse.credential);
          onLogin(USER_CREDENTIALS.email);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </div>
  );
}
