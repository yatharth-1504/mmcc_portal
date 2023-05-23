import { useNavigate } from "react-router-dom";
import "./Login.scss";

export function Login() {

  const navigate = useNavigate()

  const onLogin = () => {
    navigate('complaints')
    console.log("Logging in")
  }

  return (
    <div className="Login-Page">
      <form className="Login-Form" onSubmit={onLogin}>
        <h2>Login With your LDAP</h2>
        <label for="roll_no">Roll no.:</label>
        <input id="roll_no" type="text" required />
        <label for="password">Password:</label>
        <input id="password" type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
