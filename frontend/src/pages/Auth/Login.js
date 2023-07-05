import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useLogin } from "../../hooks/post";
import jwtDecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import CMGFS from "../../assets/cmgfs.png";
import MMCC from "../../assets/mmcc.jpg";
import plus from "../../assets/plus.svg";
import { useSelector } from "react-redux";

export function Login() {
  const [roll, setRoll] = useState();
  const [name, setName] = useState();

  const { device } = useSelector((state) => state.windowSize);

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
    navigate("/complaints", {
      state: {
        token: loginOutput.data.login.token,
        role: loginOutput.data.login.token,
      },
    });
  };

  return (
    <div className="Login-Page">
      <div className={`login-content ${device}`}>
        <div className="logos">
          <img src={CMGFS} alt="CMGFS" className={`logo ${device}`} />
          <img src={plus} alt="+" className="plus" />
          <img src={MMCC} alt="MMCC" className={`logo ${device}`} />
        </div>
        <div className="heading">Login With your SMAIL :)</div>
        <div className="LoginBtn">
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
      </div>
    </div>
  );
}
