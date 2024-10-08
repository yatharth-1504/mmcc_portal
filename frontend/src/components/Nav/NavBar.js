import { useNavigate } from "react-router-dom";
import add_img from "../../assets/add-button.jpg";
import "./NavBar.scss";
import { useSelector } from "react-redux";

export function NavBar({ buttons, token, userRole, verticle }) {
  const navigate = useNavigate();
  const { device } = useSelector((state) => state.windowSize);

  return (
    <div className={`nav-wrapper ${device}`}>
      <nav className={`Nav ${device}`}>
        <div className={`filters ${device}`}>
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
        {
          <button
            className={`button ${device}`}
            onClick={() => {
              if (
                userRole === "USER" ||
                userRole === "SUPER_COORDINATOR" ||
                userRole === "COORDINATOR"
              ) {
                navigate("/create", { state: { token } });
              } else {
                navigate("/updateRole", {
                  state: { token, userRole, userVerticle: verticle },
                });
              }
            }}
          >
            <img className="img" src={add_img} alt="add-icon"></img>
            {`${
              userRole === "USER" ||
              userRole === "SUPER_COORDINATOR" ||
              userRole === "COORDINATOR"
                ? "Add Complaint"
                : "Update Role"
            }`}
          </button>
        }
      </nav>
    </div>
  );
}
