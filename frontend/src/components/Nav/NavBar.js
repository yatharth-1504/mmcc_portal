import add_img from "../../assets/add-button.jpg";
import "./NavBar.scss";

export function NavBar({ buttons }) {
  return (
    <div>
      <nav className="Nav">
        {buttons.map((button) => (
          <div className="filters_sort" key={button.id}>
            {button.name + ":"}
            <select className="dropdown" onChange={(event) => button.method()}>
              {button.conditions.map((c, id) => (
                <option key={id}>{c}</option>
              ))}
            </select>
          </div>
        ))}
        <button>
          <img className="img" src={add_img} alt="add-icon"></img>
          {"Add Compliant"}
        </button>
      </nav>
    </div>
  );
}
