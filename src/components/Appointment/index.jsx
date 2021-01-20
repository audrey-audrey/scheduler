import React from 'react'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'

import './styles.scss';

export default function Appointment(props) {
// need time & interview

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show {...props.interview}/> : <Empty />}
    </article>
  )
}