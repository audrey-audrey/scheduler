import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList"
import Appointment from "./Appointment"

import "./Application.scss";

// Hardcoded data
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Some Student",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Random Student",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  // State
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  // Axios call to fetch days array
  useEffect(() => {
    axios.get("/api/days")
    .then((res) => setDays(res.data))
  }, [])

  // Mapping appointments array
  const parsedAppointments = appointments.map((appointment) => {
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
            days={days}
            day={day}
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
