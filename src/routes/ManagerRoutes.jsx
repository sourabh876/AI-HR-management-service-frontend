import {
  Navigate
} from "react-router-dom";

function ManagerRoute({
  children
}) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );
 
  if (!["manager", "admin"].includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ManagerRoute;