import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { axiosClient } from "../axios";
import VaccinationSpotsList from "./components/VaccinationSpotsList";

export default function VaccinationSpot() {
  const { currentUser, vaccinations } = useStateContext();

  const [spots, setSpots] = useState([]);

  const getSpotsRegion = () => {
    axiosClient.get("/spots").then(({ data }) => {
      setSpots(data.spots);
    });
  };

  useEffect(() => {
    document.title = `List Spots in ${currentUser.regional}`;
    getSpotsRegion();
  }, []);

  return (
    <main>
      <header className="jumbotron">
        <div className="container">
          <h1 className="display-4">
            {vaccinations.first ? "Second " : "First "} Vaccination
          </h1>
        </div>
      </header>

      <div className="container mb-5">
        <div className="section-header mb-4">
          <h4 className="section-title text-muted font-weight-normal">
            List Vaccination Spots in Central Jakarta
          </h4>
        </div>

        <div className="section-body">
          {spots &&
            spots.map((spot) => (
              <VaccinationSpotsList key={spot.id} spot={spot} />
            ))}
          {/* <article className="spot">
            <div className="row">
              <div className="col-5">
                <h5 className="text-primary">Usamah Hospital</h5>
                <span className="text-muted">
                  Ds. Abdullah No. 31, DKI Jakarta
                </span>
              </div>
              <div className="col-4">
                <h5>Available vaccines</h5>
                <span className="text-muted">Sinovac, Moderna, Pfizer.</span>
              </div>
              <div className="col-3">
                <h5>Serve</h5>
                <span className="text-muted">Only first vaccination</span>
              </div>
            </div>
          </article>

          <article className="spot unavailable">
            <div className="row">
              <div className="col-5">
                <h5 className="text-primary">Nasyidah Hospital</h5>
                <span className="text-muted">
                  Ki. Bakau Griya Utama No. 476, DKI Jakarta
                </span>
              </div>
              <div className="col-4">
                <h5>Available vaccines</h5>
                <span className="text-muted">
                  Sinovac, AstraZeneca, Moderna, Pfizer.
                </span>
              </div>
              <div className="col-3">
                <h5>Serve</h5>
                <span className="text-muted">Only second vaccination</span>
              </div>
            </div>
          </article>

          <article className="spot">
            <div className="row">
              <div className="col-5">
                <h5 className="text-primary">Napitupulu Hospital</h5>
                <span className="text-muted">
                  Jln. Laswi No. 228, DKI Jakarta
                </span>
              </div>
              <div className="col-4">
                <h5>Available vaccines</h5>
                <span className="text-muted">
                  Sinovac, AstraZeneca, Sinnopharm.
                </span>
              </div>
              <div className="col-3">
                <h5>Serve</h5>
                <span className="text-muted">Both vaccination</span>
              </div>
            </div>
          </article> */}
        </div>
      </div>
    </main>
  );
}
