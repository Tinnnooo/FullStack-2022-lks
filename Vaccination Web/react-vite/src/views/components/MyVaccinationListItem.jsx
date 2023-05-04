import { useEffect } from "react";

export default function MyVaccinationListItem({ first, second }) {
  return (
    <>
      {first && (
        <div className="col-md-4">
          <div className="card card-default">
            <div className="card-header border-0">
              <h5 className="mb-0">First Vaccination</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td className="text-muted">
                      <span className="badge badge-primary">
                        {first.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td className="text-muted">{first.vaccination_date}</td>
                  </tr>
                  <tr>
                    <th>Spot</th>
                    <td className="text-muted">{first.spot.name}</td>
                  </tr>
                  <tr>
                    <th>Vaccine</th>
                    <td className="text-muted">
                      {!first.vaccine ? "-" : first.vaccine.name}
                    </td>
                  </tr>
                  <tr>
                    <th>Vaccinator</th>
                    <td className="text-muted">
                      {!first.vaccinator ? "-" : first.vaccinator.name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {second && (
        <div className="col-md-4">
          <div className="card card-default">
            <div className="card-header border-0">
              <h5 className="mb-0">Second Vaccination</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td className="text-muted">
                      <span className="badge badge-info">{second.status}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td className="text-muted">{second.vaccination_date}</td>
                  </tr>
                  <tr>
                    <th>Spot</th>
                    <td className="text-muted">{second.spot.name}</td>
                  </tr>
                  <tr>
                    <th>Vaccine</th>
                    <td className="text-muted">
                      {!second.vaccine ? "-" : second.vaccine.name}
                    </td>
                  </tr>
                  <tr>
                    <th>Vaccinator</th>
                    <td className="text-muted">
                      {" "}
                      {!second.vaccinator ? "-" : second.vaccinator.name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
