import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
// import Qualities from "../../ui/qualities";
// import { Link } from "react-router-dom";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetings from "../../ui/completedMeetings";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <CompletedMeetings
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
