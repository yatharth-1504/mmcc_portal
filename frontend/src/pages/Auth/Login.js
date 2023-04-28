import "./Login.scss";

export function Login() {
  return (
    <div className="Login-Page">
      <form className="Login-Form">
        <h2>Login With your LDAP</h2>
        <label for="roll_no">Roll no.:</label>
        <input id="roll_no" type="text" required />
        <label for="password">Password:</label>
        <input id="password" type="text" required />
        <button>Submit</button>
      </form>
    </div>
  );
}
