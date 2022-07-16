import React from "react";

const BoockMark = ({ status, onToggleBookMark }) => {
  const BK_DEF = <i className="bi bi-bookmark"></i>;
  const BK_LIKE = <i className="bi bi-bookmark-heart"></i>;

  return (
    <button className="btn" onClick={onToggleBookMark}>
      {!status ? BK_DEF : BK_LIKE}
    </button>
  );
};

export default BoockMark;
