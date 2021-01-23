import React from "react";

import "./InterviewerListItem.scss";

let className = require("classnames");

export default function InterviewerListItem(props) {
  const { name, avatar, setInterviewer, selected } = props;

  const interviewerClass = className("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
