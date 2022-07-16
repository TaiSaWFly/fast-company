import React from "react";
import Qualitie from "./qualitie";
import BoockMark from "./bookmark";

const User = (user) => {
  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((qualities) => (
            <Qualitie
              key={qualities._id}
              color={qualities.color}
              name={qualities.name}
            />
          ))}
        </td>
        <td>{user.profession}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <BoockMark
            key={user._id}
            status={user.status}
            onToggleBookMark={user.onToggleBookMark}
          />
        </td>
        <td>
          <button className="btn btn-danger" onClick={user.onDelete}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
