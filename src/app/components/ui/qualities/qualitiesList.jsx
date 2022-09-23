import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { getQualities, isLoading } = useQualities();
    const qualityArray = getQualities(qualities);

    return (
        <>
            {!isLoading
                ? qualityArray.map((qual) => (
                      <Quality key={qual._id} {...qual} />
                  ))
                : "Loading..."}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
