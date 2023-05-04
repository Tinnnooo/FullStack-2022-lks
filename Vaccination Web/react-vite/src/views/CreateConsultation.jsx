import { useEffect, useState } from "react";
import { axiosClient } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function CreateConsultation() {
  const [disease_history, setDiseaseHistory] = useState("");
  const [haveDisease, setHaveDisease] = useState("yes");

  const [current_symptoms, setCurrentSymptoms] = useState("");
  const [haveSymptoms, setHaveSymptoms] = useState("yes");

  const { showToast } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Request Consultation";
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .post("/consultations", {
        disease_history,
        current_symptoms,
      })
      .then(({ data }) => {
        showToast(data.message);
        navigate("/");
      });
  };

  return (
    <main>
      <header className="jumbotron">
        <div className="container">
          <h1 className="display-4">Request Consultation</h1>
        </div>
      </header>

      <div className="container">
        <form method="post" onSubmit={onSubmit}>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label htmlFor="disease-history" className="mr-3 mb-0">
                    Do you have disease history ?
                  </label>
                  <select
                    className="form-control-sm"
                    value={haveDisease}
                    onChange={(e) => setHaveDisease(e.target.value)}
                  >
                    <option value="yes">Yes, I have</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {haveDisease === "yes" && (
                  <textarea
                    id="disease-history"
                    className="form-control"
                    cols="30"
                    rows="10"
                    placeholder="Describe your disease history"
                    value={disease_history}
                    onInput={(e) => setDiseaseHistory(e.target.value)}
                    required
                  ></textarea>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label htmlFor="current-symptoms" className="mr-3 mb-0">
                    Do you have symptoms now ?
                  </label>
                  <select
                    className="form-control-sm"
                    value={haveSymptoms}
                    onChange={(e) => setHaveSymptoms(e.target.value)}
                  >
                    <option value="yes">Yes, I have</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {haveSymptoms === "yes" && (
                  <textarea
                    id="current-symptoms"
                    className="form-control"
                    cols="30"
                    rows="10"
                    placeholder="Describe your current symptoms"
                    value={current_symptoms}
                    onInput={(e) => setCurrentSymptoms(e.target.value)}
                    required
                  ></textarea>
                )}
              </div>
            </div>
          </div>

          <button className="btn btn-primary">Send Request</button>
        </form>
      </div>
    </main>
  );
}
