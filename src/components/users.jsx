import React from "react";
import { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handelDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = () => {
    const declOfNum = (number, titles, cases = [2, 0, 1, 1, 1, 2]) => {
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    };

    return users.length !== 0 ? (
      <>
        <div className="fs-4 badge bg-primary">
          {`${users.length} ${declOfNum(users.length, [
            "человек",
            "человека",
            "человек",
          ])} тусанёт с тобой сегодня :P`}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualities) => (
                    <span
                      key={qualities._id}
                      className={`badge bg-${qualities.color} m-1`}
                    >
                      {qualities.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handelDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <div className="fs-4 badge bg-danger">{`Никто с тобой не тусанёт :*(`}</div>
    );
  };

  return <>{renderPhrase()}</>;
};

export default Users;
