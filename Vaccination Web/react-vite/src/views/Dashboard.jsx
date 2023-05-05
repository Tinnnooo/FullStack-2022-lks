import { useEffect, useState } from "react";
import { axiosClient } from "../axios";
import MyConsultation from "./components/MyConsultation";
import MyVaccination from "./components/MyVaccination";
import { useStateContext } from "../contexts/ContextProvider";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const { consultation, setConsultation, vaccinations, setVaccinations } =
    useStateContext();

  const getConsultations = () => {
    setLoading(true);
    axiosClient.get("/consultations").then(({ data }) => {
      setConsultation(data);
    });
  };

  const getVaccinations = () => {
    axiosClient.get("/vaccinations").then(({ data }) => {
      setVaccinations(data.vaccinations);
      setLoading(false);
    });
  };

  useEffect(() => {
    document.title = "Dashboard";
    getConsultations();
    getVaccinations();
  }, []);

  return (
    <main>
      <header className="jumbotron">
        <div className="container">
          <h1 className="display-4">Dashboard</h1>
        </div>
      </header>

      <div className="container">
        {loading && (
          <div className="text-md-center font-weight-bold">Loading...</div>
        )}
        {!loading && (
          <>
            <MyConsultation consultation={consultation} />
            <MyVaccination
              vaccinations={vaccinations}
              consultation={consultation}
            />
          </>
        )}
      </div>
    </main>
  );
}
