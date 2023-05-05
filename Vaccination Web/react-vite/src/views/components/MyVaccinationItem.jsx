import { Link } from "react-router-dom";

function MyVaccinationItemTable({ vaccination }) {
  return (
    <table className="table table-striped mb-0">
      <MyVaccinationItemRow
        key="Status"
        name="Status"
        data={vaccination.status === "done" ? "Vaccinated" : "Registered"}
      />
      <MyVaccinationItemRow
        key="Date"
        name="Date"
        data={vaccination.vaccination_date}
      />
      <MyVaccinationItemRow
        key="Spot"
        name="Spot"
        data={vaccination.spot.name}
      />
      <MyVaccinationItemRow
        key="Vaccine"
        name="Vaccine"
        data={!vaccination.vaccine ? "-" : vaccination.vaccine.name}
      />
      <MyVaccinationItemRow
        key="Vaccinator"
        name="Vaccinator"
        data={!vaccination.vaccinator ? "-" : vaccination.vaccinator.name}
      />
    </table>
  );
}

function MyVaccinationItemRow({ name, data }) {
  return (
    <tr>
      <th>{name}</th>
      <td className="text-muted">
        {name === "Status" ? (
          <span className="badge badge-primary">{data}</span>
        ) : (
          data
        )}
      </td>
    </tr>
  );
}

export default function MyVaccinationItem({ vaccination, dose }) {
  const details = vaccination ? (
    <MyVaccinationItemTable vaccination={vaccination} />
  ) : (
    <Link to="/vaccination-spot">+ Register vaccination</Link>
  );

  return (
    <div className="col-md-4">
      <div className="card card-default">
        <div className="card-header border-0">
          <h5 className="mb-0">{dose} Vaccination</h5>
        </div>
        <div className={`card-body ${vaccination ? "p-0" : ""}`}>{details}</div>
      </div>
    </div>
  );
}
