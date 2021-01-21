import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList"
import Appointment from "./Appointment"
import { getAppointmentsForDay } from "../helpers/selectors";

import "./Application.scss";

export default function Application(props) {
  // State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  // setState funcs
  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));

  // Axios call to fetch info
  const getDays = () => {
    return axios({
      url: `/api/days`,
      method: 'GET'
    })
  };

  const getAppointments = () => {
    return axios({
      url: `/api/appointments`,
      method: 'GET'
    })
  };

  useEffect(() => {
    Promise.all([
      getDays(), 
      getAppointments(), 
    ])
    .then(([days, appointments]) => {
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data}))
    })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("daily appts", dailyAppointments)

  // Mapping appointments array
  const parsedAppointments = dailyAppointments.map((appointment) => {
    return <Appointment
      key={appointment.id}
      {...appointment}
    />
  })
  // Adding last appt
  parsedAppointments.push(<Appointment key="last" time="5pm" />)

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
        {parsedAppointments}
      </section>
    </main>
  );
}
