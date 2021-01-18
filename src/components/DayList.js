import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // const { days, day, setDay } = props;

  return (
    <ul>
      {
        props.days.map((item) => {
          return (
            <DayListItem
              key={props.day.id}
              name={props.day}
              spots={item.spots}
              selected={item.name === props.day}
              setDay={props.setDay}
            />
          )
        })
      }
    </ul>
  )
}