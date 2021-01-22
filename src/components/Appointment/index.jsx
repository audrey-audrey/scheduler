import React from 'react'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'

import useVisualMode from '../../hooks/useVisualMode'

import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM"

export default function Appointment(props) {
  // save interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(props)
    props.bookInterview(props.id, interview);

    transition(SHOW);
  }

  const { mode, transition } = useVisualMode(
  // const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={save} // ???
          onCancel={() => transition(EMPTY)}
        />
      )}
    </article>
  )
}