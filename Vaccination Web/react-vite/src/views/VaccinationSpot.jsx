import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { axiosClient } from "../axios";
import VaccinationSpotsList from "./components/VaccinationSpotsList";

export default function VaccinationSpot() {
  const { currentUser, vaccinations, setVaccinations } = useStateContext();
  const [loading, setLoading] = useState(false);

  const [spots, setSpots] = useState([]);

  const getVaccinations = () => {
    axiosClient.get("/vaccinations").then(({ data }) => {
      setVaccinations(data.vaccinations);
    });
  };

  const getSpotsRegion = () => {
    axiosClient.get("/spots").then(({ data }) => {
      setSpots(data.spots);
      setLoading(false);
    });
  };

  useEffect(() => {
    document.title = `List Spots in ${currentUser.regional}`;
    setLoading(true);
    getVaccinations();
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

        {loading && (
          <div className="text-md-center font-weight-bold">Loading...</div>
        )}

        {!loading && (
          <div className="section-body">
            {spots &&
              spots.map((spot) => (
                <VaccinationSpotsList
                  key={spot.id}
                  spot={spot}
                  vaccinations={vaccinations}
                />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
