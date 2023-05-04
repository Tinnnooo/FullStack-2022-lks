import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { axiosClient } from "../axios";
import { useNavigate, useParams } from "react-router-dom";

export default function VaccinationSpotShow() {
  const { currentUser, showToast } = useStateContext();
  const [spot, setSpot] = useState({});
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `List Spots in ${currentUser && currentUser.regional}`;

    setLoading(true);
    axiosClient
      .get(`/spots/${id}`, {
        params: {
          date: date,
        },
      })
      .then(({ data }) => {
        setSpot(data);
        if (!date) {
          setDefaultDate(data.date);
        }
        setLoading(false);
      });
  }, [date]);

  const isMySlot = (number) => {
    if (
      number > spot.vaccination_count &&
      number === spot.vaccination_count + 1
    ) {
      return true;
    }
    return false;
  };

  const isSlotFilled = (number) => {
    if (spot) {
      if (number <= spot.vaccination_count) {
        return true;
      }
    }

    return false;
  };

  const setDefaultDate = (date) => {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, 0);
    const day = String(inputDate.getDate()).padStart(2, 0);

    const formattedDate = `${year}-${month}-${day}`;

    setDate(formattedDate);
  };

  const onClick = () => {
    axiosClient
      .post("/vaccinations", {
        date: date,
        spot_id: spot.spot.id,
      })
      .then(({ data }) => {
        showToast(data.message);
        navigate("/");
      })
      .catch(({ response }) => {
        showToast(response.data.message, "red");
        navigate("/");
      });
  };

  return (
    <main>
      <header className="jumbotron">
        {loading && (
          <div className="text-md-center font-weight-bold">Loading...</div>
        )}

        {!loading && (
          <div className="container d-flex justify-content-between align-items-center">
            {spot && spot.spot && (
              <div>
                <h1 className="display-4">{spot.spot.name}</h1>
                <span className="text-muted">{spot.spot.address}</span>
              </div>
            )}
            <a href="#" className="btn btn-primary" onClick={onClick}>
              Register vaccination
            </a>
          </div>
        )}
      </header>

      <div className="container">
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="vaccination-date">Select vaccination date</label>
              <input
                type="date"
                className="form-control"
                id="vaccination-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-md-center font-weight-bold">Loading...</div>
        )}

        {!loading && spot.spot && spot.spot.capacity === 15 && (
          <div className="row mb-5">
            <div className="col-md-4">
              <div className="card card-default">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4>Session 1</h4>
                    <span className="text-muted">09:00 - 11:00</span>
                  </div>
                  <div>
                    <div className="row">
                      {Array.from(Array(5), (_, index) => (
                        <div className="col-4 mb-4" key={index}>
                          <div
                            className={`slot ${
                              isMySlot(index + 1)
                                ? "bg-primary text-white"
                                : isSlotFilled(index + 1)
                                ? "filled"
                                : ""
                            }`}
                          >
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card card-default">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4>Session 2</h4>
                    <span className="text-muted">13:00 - 15:00</span>
                  </div>
                  <div>
                    <div className="row">
                      {Array.from(Array(5), (_, index) => (
                        <div className="col-4 mb-4" key={index}>
                          <div
                            className={`slot ${
                              isMySlot(index + 6)
                                ? "bg-primary text-white"
                                : isSlotFilled(index + 6)
                                ? "filled"
                                : ""
                            }`}
                          >
                            #{index + 6}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card card-default">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4>Session 3</h4>
                    <span className="text-muted">15:00 - 17:00</span>
                  </div>
                  <div>
                    <div className="row">
                      {Array.from(Array(5), (_, index) => (
                        <div className="col-4 mb-4" key={index}>
                          <div
                            className={`slot ${
                              isMySlot(index + 11)
                                ? "bg-primary text-white"
                                : isSlotFilled(index + 11)
                                ? "filled"
                                : ""
                            }`}
                          >
                            #{index + 11}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
