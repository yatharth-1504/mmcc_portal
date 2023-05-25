import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useLogin } from "../../hooks/post";
import jwtDecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export function Login() {
  const [roll, setRoll] = useState();
  const [name, setName] = useState();

  const navigate = useNavigate();
  const [login] = useLogin({
    variables: {
      login: {
        roll: roll,
        name: name,
      },
    },
  });

  const onLogin = async () => {
    const loginOutput = await login();
    navigate("/complaints", { state: { token: loginOutput.data.login.token } });
  };

  return (
    <div className="Login-Page">
      <h2>Login With your SMAIL :)</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const USER_CREDENTIALS = jwtDecode(credentialResponse.credential);
          setRoll(USER_CREDENTIALS.email);
          setName(USER_CREDENTIALS.name);
          onLogin();
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </div>
  );
}
