import React from 'react';

import InterviewerListItem from './InterviewerListItem'

import './InterviewerList.scss'

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list">
        {
          interviewers && interviewers.map((item) => {
            return <InterviewerListItem
              key={item.id}
              name={item.name}
              avatar={item.avatar}
              setInterviewer={() => setInterviewer(item.id)}
              selected={item.id === interviewer}
            />
          })
        }</ul>
    </section>
  )
}