import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/components/GuestLayout";
import DefaultLayout from "./views/components/DefaultLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import CreateConsultation from "./views/CreateConsultation";
import VaccinationSpot from "./views/VaccinationSpot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/consultation/create",
        element: <CreateConsultation />,
      },
      {
        path: "/vaccination-spot",
        element: <VaccinationSpot />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
