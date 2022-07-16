import React from "react";

const BoockMark = ({ status, onToggleBookMark }) => {
  const notLike = <i className="bi bi-bookmark"></i>;
  const like = <i className="bi bi-bookmark-heart"></i>;

  return (
    <button className="btn" onClick={onToggleBookMark}>
      {!status ? notLike : like}
    </button>
  );
};

export default BoockMark;
