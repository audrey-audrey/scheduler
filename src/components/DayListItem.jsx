import React from "react";

import "./DayListItem.scss";

let classNames = require("classnames");

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  // Formatting sentence for spots remaining
  const formatSpots = `${spots === 0 ? "no" : spots} ${
    spots === 1 ? "spot" : "spots"
  } remaining`;

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots}</h3>
    </li>
  );
}
