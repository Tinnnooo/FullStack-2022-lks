import { useEffect, useState } from "react";
import { axiosClient } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const { setCurrentUser, setToken } = useStateContext();
  const [id_card_number, setIdCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    document.title = "Login";
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .post("/auth/login", {
        id_card_number,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data);
        setToken(data.token);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          if (error.response.data.errors) {
            setError(error.response.data.errors);
          } else if (error.response) {
            setError(error.response.data);
          }
        }
      });
  };

  return (
    <main>
      <header className="jumbotron">
        <div className="container text-center">
          <h1 className="display-4">Vaccination Platform</h1>
        </div>
      </header>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              className="card card-default"
              method="post"
              onSubmit={onSubmit}
            >
              <div className="card-header">
                <h4 className="mb-0">Login</h4>
              </div>
              {error && error.message && (
                <small className="text-danger text-center mt-3">
                  {error.message}
                </small>
              )}
              <div className="card-body">
                <div className="form-group row align-items-center">
                  <div className="col-4 text-right">ID Card Number</div>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      id="id_card_number"
                      name="id_card_number"
                      value={id_card_number}
                      onChange={(e) => setIdCardNumber(e.target.value)}
                    />
                    {error && error.id_card_number && (
                      <small className="text-danger">
                        {error.id_card_number}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <div className="col-4 text-right">Password</div>
                  <div className="col-8">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && error.password && (
                      <small className="text-danger">{error.password}</small>
                    )}
                  </div>
                </div>
                <div className="form-group row align-items-center mt-4">
                  <div className="col-4"></div>
                  <div className="col-8">
                    <button className="btn btn-primary">Login</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
