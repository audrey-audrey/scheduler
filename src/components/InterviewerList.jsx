import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewers &&
          interviewers.map((item) => {
            return (
              <InterviewerListItem
                key={item.id}
                name={item.name}
                avatar={item.avatar}
                selected={item.id === value}
                setInterviewer={() => onChange(item.id)}
              />
            );
          })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

