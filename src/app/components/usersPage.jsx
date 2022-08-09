import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";

const UsersPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleAllUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                {
                    <div key={user._id}>
                        <h1>{user.name}</h1>
                        <h2>Профессия: {user.profession.name}</h2>
                        <div>
                            {user.qualities.map((qual) => (
                                <span
                                    key={qual._id}
                                    className={"badge m-1 bg-" + qual.color}
                                >
                                    {qual.name}
                                </span>
                            ))}
                        </div>
                        <h3>Встретился, раз: {user.completedMeetings}</h3>
                        <h4>Оценка: {user.rate}</h4>
                        <button
                            onClick={() => {
                                handleAllUsers();
                            }}
                        >
                            Все пользователи
                        </button>
                    </div>
                }
            </>
        );
    }
    return <h1>Loading</h1>;
};
UsersPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UsersPage;
