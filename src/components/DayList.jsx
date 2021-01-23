import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  return (
    <ul>
      {days.map((item) => {
        return (
          <DayListItem
            key={item.id}
            name={item.name}
            spots={item.spots}
            selected={item.name === day}
            setDay={setDay}
          />
        );
      })}
    </ul>
  );
}
