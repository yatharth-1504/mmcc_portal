import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.scss";
import { GoogleLogin } from "@react-oauth/google";

export function Login() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLogin = () => {
    navigate("complaints");
  };

  return (
    <div className="Login-Page">
      <form className="Login-Form" onSubmit={onLogin}>
        <h2>Login With your SMAIL</h2>
        <label htmlFor="roll">Smail:</label>
        <input
          id="roll"
          type="text"
          required
          value={roll}
          onChange={(e) => {
            setRoll(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </div>
  );
}
