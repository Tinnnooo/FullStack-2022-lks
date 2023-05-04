import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();

  return (
    <>{toast.show && <div className="toast-message">{toast.message}</div>}</>
  );
}
