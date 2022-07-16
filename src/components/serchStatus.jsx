import React from "react";

const SerchStatus = ({ length }) => {
  const declOfNum = (number, titles, cases = [2, 0, 1, 1, 1, 2]) => {
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  return length !== 0 ? (
    <div className="fs-4 badge bg-primary">
      {`${length} ${declOfNum(length, [
        "человек",
        "человека",
        "человек",
      ])} тусанёт с тобой сегодня :P`}
    </div>
  ) : (
    <div className="fs-4 badge bg-danger">{`Никто с тобой не тусанёт :*(`}</div>
  );
};

export default SerchStatus;
