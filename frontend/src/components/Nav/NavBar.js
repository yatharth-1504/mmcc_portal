import { useNavigate } from "react-router-dom";
import add_img from "../../assets/add-button.jpg";
import "./NavBar.scss";

export function NavBar({ buttons }) {
  const navigate = useNavigate()
  
  return (
    <div>
      <nav className="Nav">
        {buttons.map((button) => (
          <div className="filters_sort">
            {button.name + ":"}
            <button className="dropbtn">{button.conditions[0]}</button>
            <div className="dropdown-content">
              {button.conditions.map((option) => (
                <div className="dropdown-elements">{option}</div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={()=>navigate('/create')}>
          <img className="img" src={add_img} alt="add-icon"></img>
          {"Add Compliant"}
        </button>
      </nav>
    </div>
  );
}
