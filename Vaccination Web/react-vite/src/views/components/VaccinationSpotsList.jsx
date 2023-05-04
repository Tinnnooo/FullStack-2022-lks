import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function VaccinationSpotsList({ spot }) {
  const { vaccinations } = useStateContext();
  const vaccines = Object.keys(spot.available_vaccines).filter(
    (key) => spot.available_vaccines[key]
  );

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/vaccination-spot/${spot.id}`);
  };

  return (
    <>
      <article
        className={`spot ${
          (!vaccinations.second && spot.serve === 1) ||
          (vaccinations.second && spot.serve === 2)
            ? "unavailable"
            : ""
        } `}
        onClick={onClick}
      >
        <div className="row">
          <div className="col-5">
            <h5 className="text-primary">{spot.name}</h5>
            <span className="text-muted">{spot.address}</span>
          </div>
          <div className="col-4">
            <h5>Available vaccines</h5>
            <span className="text-muted">
              {vaccines.map((vaccine, index) => (
                <span key={index}>
                  {vaccine}
                  {index !== vaccines.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>
          <div className="col-3">
            <h5>Serve</h5>
            <span className="text-muted">
              {spot.serve <= 2
                ? `Only ${spot.serve === 1 ? "first" : "second"} vaccination`
                : "Both vaccination"}
            </span>
          </div>
        </div>
      </article>
    </>
  );
}
