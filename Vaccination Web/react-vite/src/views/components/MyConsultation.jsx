import MyConsultationListItem from "./MyConsultationListItem";
import { Link } from "react-router-dom";

export default function MyConsultation({ consultation }) {
  return (
    <section className="consultation-section mb-5">
      <div className="section-header mb-3">
        <h4 className="section-title text-muted">My Consultation</h4>
      </div>
      <div className="row">
        {consultation && consultation.length <= 0 && (
          <div className="col-md-4">
            <div className="card card-default">
              <div className="card-header">
                <h5 className="mb-0">Consultation</h5>
              </div>
              <div className="card-body">
                <Link to="/consultation/create">+ Request consultation</Link>
              </div>
            </div>
          </div>
        )}

        {consultation && (
          <MyConsultationListItem
            key={consultation.id}
            consultation={consultation}
          />
        )}
      </div>
    </section>
  );
}
