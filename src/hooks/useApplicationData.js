import { useState, useEffect } from 'react';
import axios from 'axios';

import { fetchDays, fetchAppointments, fetchInterviewers } from "../helpers/helperFunctions";

export default function useApplicationData() {

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

  // book interview
  function bookInterview(id, interview) {
    // console.log('id', id, 'interview', interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }))

  }

  // cancelInterview 
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      // .put(`api/appointments/${id}`, {student: null, interviewer: null})
      .delete(`api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }))
  }
  return { state, setDay, bookInterview, cancelInterview }
}