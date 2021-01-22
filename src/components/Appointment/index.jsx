import React from 'react'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

import useVisualMode from '../../hooks/useVisualMode'

import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  // save interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => console.log("Error", err))
  }

  // delete interview
  function del() {
    transition(DELETING)

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => console.log("Error", err))
  }

  const { mode, transition, back } = useVisualMode(
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
          onEdit = {() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save} // ???
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={save} // ???
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode == CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={del}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
    </article>
  )
}