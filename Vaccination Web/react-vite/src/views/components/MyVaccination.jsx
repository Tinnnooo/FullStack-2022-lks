import { Link } from "react-router-dom";
import MyVaccinationListItem from "./MyVaccinationListItem";

export default function MyVaccination({ vaccinations, consultations }) {
  return (
    <section className="consultation-section mb-5">
      <div className="section-header mb-3">
        <h4 className="section-title text-muted">My Vaccinations</h4>
      </div>
      <div className="section-body">
        <div className="row mb-4">
          {!consultations.find(
            (consultation) => consultation.status === "accepted"
          ) && (
            <div className="col-md-12">
              <div className="alert alert-warning">
                Your consultation must be approved by doctor to get the vaccine.
              </div>
            </div>
          )}

          {consultations.find(
            (consultation) => consultation.status === "accepted"
          ) && (
            <>
              {!vaccinations.first && (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header border-0">
                      <h5 className="mb-0">First Vaccination</h5>
                    </div>
                    <div className="card-body">
                      <Link href="/vaccination-spot">
                        + Register vaccination
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {vaccinations.first && (
                <MyVaccinationListItem
                  first={vaccinations.first}
                  second={vaccinations.second}
                />
              )}

              {!vaccinations.second && (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header border-0">
                      <h5 className="mb-0">Second Vaccination</h5>
                    </div>
                    <div className="card-body">
                      <Link to="/vaccination-spot">+ Register vaccination</Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
