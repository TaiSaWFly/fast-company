import React, { useState } from "react";
import Users from "./users";
import SerchStatus from "./serchStatus";
import api from "../api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  };

  return users.length !== 0 ? (
    <>
      {<SerchStatus length={users.length} />}
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  ) : (
    <SerchStatus length={users.length} />
  );
};

export default App;
