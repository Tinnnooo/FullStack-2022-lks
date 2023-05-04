import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import { axiosClient } from "../../axios";
import Toast from "./Toast";
import Footer from "./Footer";

export default function DefaultLayout() {
  const { userToken, currentUser, setCurrentUser, setToken } =
    useStateContext();
  const { showToast } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient.get("/me").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);

  const onLogout = () => {
    axiosClient.post("auth/logout").then((res) => {
      showToast("Logout success");
      setCurrentUser({});
      setToken(null);
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            Vaccination Platform
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {currentUser.name}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link cursor-pointer"
                  href="#"
                  onClick={(e) => onLogout()}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      <Footer />

      <Toast />
    </>
  );
}
