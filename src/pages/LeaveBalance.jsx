import {
  useState,
  useEffect
} from "react";

import api from "../api/axios";

function LeaveBalance() {

  const [balances,
    setBalances] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchBalances();

  }, []);

  const fetchBalances =
    async () => {

      try {

        const res =
          await api.get(
            "/balances/leave-balance"
          );

          console.log(res)

        setBalances(
          res.data.balances
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <h3>
        Loading...
      </h3>
    );

  }

  return (

    <div className="card">

      <div className="card-body">

        <h3>
          My Leave Balance
        </h3>

        <table
          className="table table-bordered"
        >

          <thead>

            <tr>

              <th>
                Leave Type
              </th>

              <th>
                Remaining Balance
              </th>

            </tr>

          </thead>

          <tbody>

            {
              balances.map(
                (item) => (

                  <tr
                    key={item.name}
                  >

                    <td>
                      {item.name}
                    </td>

                    <td>
                      {item.balance}
                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default LeaveBalance;