import React from 'react';

import InterviewerListItem from './InterviewerListItem'

import './InterviewerList.scss'

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },

// storiesOf("InterviewerList", module)
//   .addParameters({
//     backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
//   })
//   .add("Initial", () => (
//     <InterviewerList
//       interviewers={interviewers}
//       setInterviewer={action("setInterviewer")}
//     />
//   ))
//   .add("Preselected", () => (
//     <InterviewerList
//       interviewers={interviewers}
//       interviewer={3}
//       setInterviewer={action("setInterviewer")}
//     />
//   ));

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterview } = props;

  const parsedInterviewers = interviewers && interviewers.map((int) => {
    return <InterviewerListItem
      key={int.id}
      {...int}
      selected={int.id === interviewer}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}