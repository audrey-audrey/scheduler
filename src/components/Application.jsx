import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList"
import Appointment from "./Appointment"
import { getAppointmentsForDay } from "../helpers/selectors";
// import { getAppointmentsForDay, getInterviewers } from "../helpers/selectors";
import { fetchDays, fetchAppointments, fetchInterviewers } from "../helpers/helperFunctions";

import "./Application.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  // State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  // setState funcs
  const setDay = day => setState(prev => ({ ...prev, day }));

  // Axios call to fetch info
  useEffect(() => {
    Promise.all([
      fetchDays(),
      fetchAppointments(),
      fetchInterviewers()
    ])
      .then(([days, appointments, interviewers]) => {
        setState(prev => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }))
      })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Mapping appointments array
  const schedule = dailyAppointments.map((appointment) => {
    return <Appointment
      key={appointment.id}
      {...appointment}
    />
  })
  // Adding last appt
  schedule.push(<Appointment key="last" time="5pm" />)

  // App 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
