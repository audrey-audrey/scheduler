import React from 'react';

import './InterviewerListItem.scss'

let className = require('classnames');

// .add("Clickable", () => (
//   <InterviewerListItem
//     id={interviewer.id}
//     name={interviewer.name}
//     avatar={interviewer.avatar}
//     setInterviewer={action("setInterviewer")}
//   />
// ));

export default function InterviewerListItem(props) {
  const { id, name, avatar, setInterviewer, selected } = props;

  const interviewerClass = className("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li
      className={interviewerClass}
      onClick={() => setInterviewer(name, id)}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}