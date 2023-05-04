export default function VaccinationSpotsList({ spot }) {
  const vaccines = Object.keys(spot.available_vaccines).filter(
    (key) => spot.available_vaccines[key]
  );

  return (
    <>
      <article className="spot">
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
            <span className="text-muted">Only first vaccination</span>
          </div>
        </div>
      </article>
    </>
  );
}
