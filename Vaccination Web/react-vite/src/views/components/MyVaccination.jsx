import { Link } from "react-router-dom";
import MyVaccinationListItem from "./MyVaccinationItem";

export default function MyVaccination({ vaccinations, consultation }) {
  const details = [];

  if (consultation && consultation.status === "accepted") {
    details.push(
      <MyVaccinationListItem
        key={vaccinations.first.id}
        vaccination={vaccinations.first}
        dose="First"
      />
    );

    if (vaccinations.first) {
      details.push(
        <MyVaccinationListItem
          key={vaccinations}
          vaccination={vaccinations.second}
          dose="Second"
        />
      );
    }
  } else {
    details.push(
      <div className="col-md-12">
        <div className="alert alert-warning">
          Your consultation must be approved by doctor to get the vaccine.
        </div>
      </div>
    );
  }
  return (
    <section className="consultation-section mb-5">
      <div className="section-header mb-3">
        <h4 className="section-title text-muted">My Vaccinations</h4>
      </div>
      <div className="section-body">
        <div className="row mb-4">{details}</div>
      </div>
    </section>
  );
}
