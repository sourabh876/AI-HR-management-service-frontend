import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar({
  showSidebar,
  setShowSidebar
}) {

  const {
    user,
    logout
  } = useContext(
    AuthContext
  );

  return (

    <>

      {/* Mobile Overlay */}

      {
        showSidebar && (

          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100"
            style={{
              background:
                "rgba(0,0,0,0.4)",
              zIndex: 999
            }}
            onClick={() =>
              setShowSidebar(false)
            }
          />

        )
      }

      <div
        className={`
        bg-dark text-white
        position-fixed
        position-md-static
        h-100
        p-3
        ${showSidebar
            ? "d-block"
            : "d-none d-md-block"
          }
      `}
        style={{
          width: "250px",
          zIndex: 1000
        }}
      >

        <h4>
          LeaveMS
        </h4>

        <hr />

        <ul className="nav flex-column">

          <li className="nav-item">

            <Link
              to="/dashboard"
              className="nav-link text-white"
            >
              Dashboard
            </Link>

          </li>

          <li className="nav-item">

            <Link
              to="/apply-leave"
              className="nav-link text-white"
            >
              Apply Leave
            </Link>

          </li>

          <li className="nav-item">

            <Link
              to="/my-leaves"
              className="nav-link text-white"
            >
              My Leaves
            </Link>

          </li>

          {
            user?.role !==
            "employee" && (

              <li className="nav-item">

                <Link
                  to="/manager-requests"
                  className="nav-link text-white"
                >
                  Requests
                </Link>

              </li>

            )
          }

          

        </ul>

        <button
          className="btn btn-danger mt-4 w-100"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </>

  );

}

export default Sidebar;