import { useNavigate } from "react-router-dom";
import add_img from "../../assets/add-button.jpg";
import "./NavBar.scss";

export function NavBar({ buttons, token }) {
  const navigate = useNavigate();

  return (
    <div className="nav-wrapper">
      <nav className="Nav">
        <div className="filters">
          {buttons.map((button) => (
            <div className="filters_sort" key={button.id}>
              {button.name + ":"}
              <select
                className="dropdown"
                onChange={(event) => button.method(event.target.value)}
              >
                {button.conditions.map((c, id) => (
                  <option key={id}>{c}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/create", { state: { token } })}>
          <img className="img" src={add_img} alt="add-icon"></img>
          {"Add Compliant"}
        </button>
      </nav>
    </div>
  );
}
